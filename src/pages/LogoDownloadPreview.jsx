import { useEffect, useMemo, useState } from "react";
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
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getLogoDownloadBySlug,
  getLogoDownloadIndex,
  logoDownloads,
} from "../data/logoDownloads";

/* =========================================================
   DOWNLOAD HELPERS
========================================================= */

function getFormatIcon(label = "") {
  const type = label.toUpperCase();

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
  anchor.download = filename;
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

  /*
    Fetching first gives the browser a proper downloadable Blob.
    If the server blocks fetch/CORS, the fallback opens the file.
  */
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
    anchor.download = format.filename;
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
          "The logo image could not be loaded for conversion."
        )
      );
    };
    image.src = imageUrl;
  });
}

async function downloadConvertedImage(
  imageUrl,
  format
) {
  const image = await loadImage(imageUrl);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Image conversion is not supported.");
  }

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  /*
    JPG does not support transparency, so a white background
    is added before drawing the logo.
  */
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
   SINGLE DYNAMIC LOGO DOWNLOAD PAGE
========================================================= */

function LogoDownloadPreview() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const logo = useMemo(
    () => getLogoDownloadBySlug(slug),
    [slug]
  );

  const currentIndex = useMemo(
    () => getLogoDownloadIndex(slug),
    [slug]
  );

  const previousLogo =
    currentIndex > 0
      ? logoDownloads[currentIndex - 1]
      : null;

  const nextLogo =
    currentIndex >= 0 &&
    currentIndex < logoDownloads.length - 1
      ? logoDownloads[currentIndex + 1]
      : null;

  const [selectedFormatId, setSelectedFormatId] =
    useState("");
  const [isFormatMenuOpen, setIsFormatMenuOpen] =
    useState(true);
  const [copied, setCopied] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState({
    state: "idle",
    message: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    setSelectedFormatId(logo?.formats?.[0]?.id || "");
    setIsFormatMenuOpen(true);
    setDownloadStatus({
      state: "idle",
      message: "",
    });
  }, [logo]);

  const selectedFormat =
    logo?.formats?.find(
      (format) => format.id === selectedFormatId
    ) ||
    logo?.formats?.[0] ||
    null;

  const handleDownload = async () => {
    if (!logo || !selectedFormat) {
      return;
    }

    setDownloadStatus({
      state: "loading",
      message: `Preparing ${selectedFormat.label} file...`,
    });

    try {
      if (selectedFormat.mode === "convert") {
        await downloadConvertedImage(
          logo.image,
          selectedFormat
        );
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
      await navigator.clipboard.writeText(
        window.location.href
      );
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      setCopied(false);
    }
  };

  const handleClose = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/services/logo-design");
  };

  if (!logo) {
    return (
      <main className="ldp-not-found">
        <div className="ldp-not-found-card">
          <ImageIcon size={54} aria-hidden="true" />

          <h1>Logo not found</h1>

          <p>
            The requested logo does not exist or the URL is
            incorrect.
          </p>

          <Link
            to="/services/logo-design"
            className="ldp-return-button"
          >
            Return to Logo Gallery
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="ldp-page">
      <div className="ldp-shell">
        {/* Top navigation */}
        <header className="ldp-topbar">
          <div className="ldp-logo-meta">
            <div
              className="ldp-brand-icon"
              aria-hidden="true"
            >
              <ImageIcon size={23} />
            </div>

            <div className="ldp-logo-title">
              <h1>{logo.title}</h1>

              <p>
                {logo.creator}
                <span aria-hidden="true"> • </span>
                {logo.category}
              </p>
            </div>
          </div>

          <div className="ldp-toolbar">
            <button
              type="button"
              className="ldp-toolbar-button"
              onClick={() =>
                window.open(logo.image, "_blank")
              }
              aria-label="Open full size image"
              title="Open full size image"
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
              {copied ? (
                <Check size={20} />
              ) : (
                <Copy size={20} />
              )}
            </button>

            <button
              type="button"
              className="ldp-toolbar-button"
              aria-label="Logo information"
              title={logo.description}
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
          {/* Large preview */}
          <section
            className="ldp-stage"
            aria-label={`${logo.title} preview`}
          >
            <button
              type="button"
              className="ldp-side-arrow ldp-side-arrow-left"
              onClick={() =>
                previousLogo &&
                navigate(
                  `/logo-download/${previousLogo.slug}`
                )
              }
              disabled={!previousLogo}
              aria-label="Previous logo"
            >
              <ChevronLeft size={26} />
            </button>

            <div className="ldp-preview-card">
              <div className="ldp-preview-heading">
                <span>Premium Logo Asset</span>
                <strong>{logo.title}</strong>
              </div>

              <div className="ldp-preview-image">
                <img
                  src={logo.image}
                  alt={logo.title}
                />
              </div>

              <div className="ldp-preview-features">
                <div>
                  <Layers3 size={20} aria-hidden="true" />
                  <span>
                    <strong>Organised Asset</strong>
                    Clean logo presentation
                  </span>
                </div>

                <div>
                  <FileImage size={20} aria-hidden="true" />
                  <span>
                    <strong>Multiple Formats</strong>
                    PNG, JPG and WEBP
                  </span>
                </div>

                <div>
                  <Download size={20} aria-hidden="true" />
                  <span>
                    <strong>Ready to Download</strong>
                    Digital branding use
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="ldp-side-arrow ldp-side-arrow-right"
              onClick={() =>
                nextLogo &&
                navigate(
                  `/logo-download/${nextLogo.slug}`
                )
              }
              disabled={!nextLogo}
              aria-label="Next logo"
            >
              <ChevronRight size={26} />
            </button>
          </section>

          {/* Download sidebar */}
          <aside className="ldp-download-panel">
            <div className="ldp-selected-file">
              <span>Selected file</span>
              <strong>
                {selectedFormat?.label || "Choose format"}
              </strong>
              <small>
                {selectedFormat?.size ||
                  "Select a format below"}
              </small>
            </div>

            <div className="ldp-download-control">
              <button
                type="button"
                className="ldp-primary-download"
                onClick={handleDownload}
                disabled={
                  !selectedFormat ||
                  downloadStatus.state === "loading"
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
                  setIsFormatMenuOpen(
                    (current) => !current
                  )
                }
                aria-expanded={isFormatMenuOpen}
                aria-label="Show file types"
              >
                <ChevronDown
                  size={20}
                  className={
                    isFormatMenuOpen ? "is-open" : ""
                  }
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
                <span className="ldp-format-title">
                  File type
                </span>

                {logo.formats.map((format) => {
                  const FormatIcon = getFormatIcon(
                    format.label
                  );
                  const isSelected =
                    selectedFormat?.id === format.id;

                  return (
                    <button
                      type="button"
                      key={format.id}
                      className={`ldp-format-item ${
                        isSelected ? "is-selected" : ""
                      }`}
                      onClick={() =>
                        setSelectedFormatId(format.id)
                      }
                    >
                      <span className="ldp-format-icon">
                        <FormatIcon
                          size={19}
                          aria-hidden="true"
                        />
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
              <h2>About this logo</h2>
              <p>{logo.description}</p>
            </div>

            <div className="ldp-logo-tags">
              {logo.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="ldp-specification-list">
              {logo.specifications.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <a
              href={logo.image}
              target="_blank"
              rel="noopener noreferrer"
              className="ldp-open-image"
            >
              Open original image
              <ExternalLink
                size={16}
                aria-hidden="true"
              />
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default LogoDownloadPreview;
