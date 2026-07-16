import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  FileArchive,
  FileImage,
  FileText,
  FileType2,
  Image as ImageIcon,
  Info,
  Layers3,
  Maximize2,
  X,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  buildDownloadUrl,
  getDownloadBySlug,
  getDownloadCategory,
  getDownloadIndex,
  getDownloadsByCategory,
} from "../data/downloadAssets";

/* =========================================================
   DOWNLOAD HELPERS
========================================================= */

function getFormatIcon(label = "") {
  const type = String(label).toUpperCase();

  if (type.includes("ZIP") || type.includes("RAR")) {
    return FileArchive;
  }

  if (
    type.includes("PSD") ||
    type.includes("AI") ||
    type.includes("FIG") ||
    type.includes("SVG")
  ) {
    return Layers3;
  }

  if (
    type.includes("PNG") ||
    type.includes("JPG") ||
    type.includes("JPEG") ||
    type.includes("WEBP")
  ) {
    return FileImage;
  }

  if (type.includes("PDF")) {
    return FileText;
  }

  return FileType2;
}

function saveBlob(blob, filename) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = objectUrl;
  anchor.download = filename || "download";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 1000);
}

async function downloadDirectFile(format) {
  if (!format?.url) {
    throw new Error("The download URL is missing.");
  }

  try {
    const response = await fetch(format.url);

    if (!response.ok) {
      throw new Error("The file could not be fetched.");
    }

    const blob = await response.blob();
    saveBlob(blob, format.filename);
  } catch {
    const anchor = document.createElement("a");

    anchor.href = format.url;
    anchor.download = format.filename || "download";
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }
}

function loadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    if (/^https?:\/\//i.test(imageUrl)) {
      image.crossOrigin = "anonymous";
    }

    image.onload = () => resolve(image);
    image.onerror = () => {
      reject(
        new Error(
          "The preview image could not be loaded for format conversion."
        )
      );
    };

    image.src = imageUrl;
  });
}

async function downloadConvertedImage(imageUrl, format) {
  const image = await loadImage(imageUrl);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Image conversion is not supported by this browser.");
  }

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  if (format.mimeType === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  context.drawImage(image, 0, 0);

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error("The converted image is empty."));
        }
      },
      format.mimeType,
      format.quality ?? 1
    );
  });

  saveBlob(blob, format.filename);
}

/* =========================================================
   UNIVERSAL DOWNLOAD PREVIEW PAGE

   Standard route:
   /download/:category/:slug

   Legacy route example:
   /logo-download/:slug
   Use <DownloadPreview fixedCategory="logo-design" />
========================================================= */

function DownloadPreview({ fixedCategory = "" }) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const categoryKey = fixedCategory || params.category || "";
  const slug = params.slug || "";

  const category = useMemo(
    () => getDownloadCategory(categoryKey),
    [categoryKey]
  );

  const assets = useMemo(
    () => getDownloadsByCategory(categoryKey),
    [categoryKey]
  );

  const asset = useMemo(
    () => getDownloadBySlug(categoryKey, slug),
    [categoryKey, slug]
  );

  const currentIndex = useMemo(
    () => getDownloadIndex(categoryKey, slug),
    [categoryKey, slug]
  );

  const previousAsset = currentIndex > 0 ? assets[currentIndex - 1] : null;
  const nextAsset =
    currentIndex >= 0 && currentIndex < assets.length - 1
      ? assets[currentIndex + 1]
      : null;

  const [selectedFormatId, setSelectedFormatId] = useState("");
  const [isFormatMenuOpen, setIsFormatMenuOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState({
    state: "idle",
    message: "",
  });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    setSelectedFormatId(asset?.formats?.[0]?.id || "");
    setIsFormatMenuOpen(true);
    setDownloadStatus({
      state: "idle",
      message: "",
    });
  }, [asset]);

  const selectedFormat =
    asset?.formats?.find((format) => format.id === selectedFormatId) ||
    asset?.formats?.[0] ||
    null;

  const goToAsset = useCallback(
    (targetAsset) => {
      if (!targetAsset) {
        return;
      }

      /*
        Replace the current preview-history entry so selecting
        previous or next does not require multiple Back clicks.
      */
      navigate(
        buildDownloadUrl(
          categoryKey,
          targetAsset.slug
        ),
        {
          replace: true,
          state: location.state,
        }
      );
    },
    [
      categoryKey,
      location.state,
      navigate,
    ]
  );

  const handleDownload = async () => {
    if (!asset || !selectedFormat) {
      return;
    }

    setDownloadStatus({
      state: "loading",
      message: `Preparing ${selectedFormat.label} file...`,
    });

    try {
      if (selectedFormat.mode === "convert") {
        await downloadConvertedImage(asset.image, selectedFormat);
      } else {
        await downloadDirectFile(selectedFormat);
      }

      setDownloadStatus({
        state: "success",
        message: `${selectedFormat.label} download started.`,
      });
    } catch (error) {
      setDownloadStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "The file could not be downloaded.",
      });
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      setCopied(false);
    }
  };

  const handleClose = useCallback(() => {
    const openedFromGallery =
      Boolean(location.state?.fromDownloadButton);

    /*
      When the user opened this page from a gallery, return to
      that exact browser-history entry.
    */
    if (
      openedFromGallery &&
      window.history.length > 1
    ) {
      navigate(-1);
      return;
    }

    /*
      Directly opened preview URLs return to their configured
      category gallery instead of an unrelated browser page.
    */
    navigate(
      location.state?.fromPath ||
        category?.galleryPath ||
        "/",
      {
        replace: true,
      }
    );
  }, [
    category?.galleryPath,
    location.state,
    navigate,
  ]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }

      if (
        event.key === "ArrowLeft" &&
        previousAsset
      ) {
        goToAsset(previousAsset);
      }

      if (
        event.key === "ArrowRight" &&
        nextAsset
      ) {
        goToAsset(nextAsset);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    goToAsset,
    handleClose,
    nextAsset,
    previousAsset,
  ]);

  if (!category || !asset) {
    return (
      <main className="ldp-not-found">
        <div className="ldp-not-found-card">
          <ImageIcon size={54} aria-hidden="true" />

          <h1>Design not found</h1>

          <p>
            The requested design category, asset, or URL does not exist.
          </p>

          <Link
            to={category?.galleryPath || "/"}
            className="ldp-return-button"
          >
            Return to Design Gallery
          </Link>
        </div>
      </main>
    );
  }

  const featureIcons = [Layers3, FileImage, Download];

  return (
    <main className="ldp-page">
      <div className="ldp-shell">
        <header className="ldp-topbar">
          <div className="ldp-logo-meta">
            <div className="ldp-brand-icon" aria-hidden="true">
              <ImageIcon size={23} />
            </div>

            <div className="ldp-logo-title">
              <h1>{asset.title}</h1>

              <p>
                {asset.creator}
                <span aria-hidden="true"> • </span>
                {asset.category}
              </p>
            </div>
          </div>

          <div className="ldp-toolbar">
            <button
              type="button"
              className="ldp-toolbar-button"
              onClick={() => window.open(asset.image, "_blank")}
              aria-label="Open full-size image"
              title="Open full-size image"
            >
              <Maximize2 size={20} />
            </button>

            <button
              type="button"
              className="ldp-toolbar-button"
              onClick={handleCopyLink}
              aria-label="Copy page link"
              title="Copy page link"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>

            <button
              type="button"
              className="ldp-toolbar-button"
              aria-label="Design information"
              title={asset.description}
            >
              <Info size={20} />
            </button>
          </div>

          <button
            type="button"
            className="ldp-close-button"
            onClick={handleClose}
            aria-label="Close download page"
          >
            <X size={25} />
          </button>
        </header>

        <div className="ldp-main-layout">
          <section
            className="ldp-stage"
            aria-label={`${asset.title} preview`}
          >
            <button
              type="button"
              className="ldp-side-arrow ldp-side-arrow-left"
              onClick={() => goToAsset(previousAsset)}
              disabled={!previousAsset}
              aria-label={`Previous ${category.singularName}`}
            >
              <ChevronLeft size={26} />
            </button>

            <div className="ldp-preview-card">
              <div className="ldp-preview-heading">
                <span>{asset.previewEyebrow}</span>
                <strong>{asset.title}</strong>
              </div>

              <div className="ldp-preview-image">
                <img src={asset.image} alt={asset.title} />
              </div>

              <div className="ldp-preview-features">
                {asset.previewFeatures.map((feature, index) => {
                  const FeatureIcon =
                    featureIcons[index % featureIcons.length];

                  return (
                    <div key={`${feature.title}-${index + 1}`}>
                      <FeatureIcon size={20} aria-hidden="true" />

                      <span>
                        <strong>{feature.title}</strong>
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              className="ldp-side-arrow ldp-side-arrow-right"
              onClick={() => goToAsset(nextAsset)}
              disabled={!nextAsset}
              aria-label={`Next ${category.singularName}`}
            >
              <ChevronRight size={26} />
            </button>
          </section>

          <aside className="ldp-download-panel">
            <div className="ldp-selected-file">
              <span>Selected file</span>
              <strong>{selectedFormat?.label || "Choose format"}</strong>
              <small>
                {selectedFormat?.size || "Select a format below"}
              </small>
            </div>

            <div className="ldp-download-control">
              <button
                type="button"
                className="ldp-primary-download"
                onClick={handleDownload}
                disabled={
                  !selectedFormat || downloadStatus.state === "loading"
                }
              >
                <Download size={20} aria-hidden="true" />

                {downloadStatus.state === "loading"
                  ? "Preparing..."
                  : "Download"}
              </button>

              <button
                type="button"
                className="ldp-format-toggle"
                onClick={() =>
                  setIsFormatMenuOpen((current) => !current)
                }
                aria-expanded={isFormatMenuOpen}
                aria-label="Show file types"
              >
                <ChevronDown
                  size={20}
                  className={isFormatMenuOpen ? "is-open" : ""}
                />
              </button>
            </div>

            {downloadStatus.message && (
              <p
                className={`ldp-download-status is-${downloadStatus.state}`}
                role="status"
              >
                {downloadStatus.message}
              </p>
            )}

            {isFormatMenuOpen && (
              <div className="ldp-format-menu">
                <span className="ldp-format-title">File type</span>

                {asset.formats.map((format) => {
                  const FormatIcon = getFormatIcon(format.label);
                  const isSelected = selectedFormat?.id === format.id;

                  return (
                    <button
                      type="button"
                      key={format.id}
                      className={`ldp-format-item ${
                        isSelected ? "is-selected" : ""
                      }`}
                      onClick={() => setSelectedFormatId(format.id)}
                    >
                      <span className="ldp-format-icon">
                        <FormatIcon size={19} aria-hidden="true" />
                      </span>

                      <span className="ldp-format-copy">
                        <strong>{format.label}</strong>
                        <small>{format.size}</small>
                      </span>

                      {format.badge && (
                        <span className="ldp-format-badge">
                          {format.badge}
                        </span>
                      )}

                      {isSelected && !format.badge && (
                        <Check
                          size={18}
                          className="ldp-format-check"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="ldp-about-logo">
              <h2>About this design</h2>
              <p>{asset.description}</p>
            </div>

            <div className="ldp-logo-tags">
              {asset.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="ldp-specification-list">
              {asset.specifications.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <a
              href={asset.image}
              target="_blank"
              rel="noopener noreferrer"
              className="ldp-open-image"
            >
              Open original image
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default DownloadPreview;
