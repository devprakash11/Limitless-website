import { Download } from "lucide-react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { buildDownloadUrl } from "../data/downloadAssets";

/**
 * Opens the universal download-preview page.
 *
 * It does not download the image directly.
 *
 * Example:
 * /download/poster-design/air-force-day-poster
 */
function DownloadPreviewButton({
  asset,
  categoryKey,
  slug,
  children = "Download",
  className = "",
  showIcon = true,
  onBeforeNavigate,
  disabled = false,
  replace = false,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const resolvedCategory =
    asset?.categoryKey || categoryKey;

  const resolvedSlug =
    asset?.slug || slug;

  const resolvedTitle =
    asset?.title || "design";

  const openPreviewPage = () => {
    const previewUrl = buildDownloadUrl(
      resolvedCategory,
      resolvedSlug
    );

    if (!previewUrl || previewUrl === "/") {
      console.error(
        "DownloadPreviewButton: invalid preview URL.",
        {
          resolvedCategory,
          resolvedSlug,
        }
      );

      return;
    }

    /*
      Store the current gallery URL.

      DownloadPreview uses this information to return the user
      to the correct page when its close button is selected.
    */
    const fromPath = [
      location.pathname,
      location.search,
      location.hash,
    ].join("");

    navigate(previewUrl, {
      replace,
      state: {
        fromDownloadButton: true,
        fromPath,
        categoryKey: resolvedCategory,
        slug: resolvedSlug,
      },
    });
  };

  const handleOpenPreview = async (event) => {
    /*
      Stop an old parent link, form, card click, or direct
      download handler from running.
    */
    event.preventDefault();
    event.stopPropagation();

    if (disabled) {
      return;
    }

    if (!resolvedCategory || !resolvedSlug) {
      console.error(
        "DownloadPreviewButton: categoryKey or slug is missing.",
        {
          asset,
          categoryKey,
          slug,
        }
      );

      return;
    }

    /*
      This is useful when the button is inside a small image
      preview modal. The modal closes before navigation.
    */
    if (typeof onBeforeNavigate === "function") {
      try {
        await onBeforeNavigate();
      } catch (error) {
        console.error(
          "DownloadPreviewButton: onBeforeNavigate failed.",
          error
        );
      }
    }

    openPreviewPage();
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleOpenPreview}
      disabled={disabled}
      aria-label={`Open download preview for ${resolvedTitle}`}
    >
      {showIcon && (
        <Download
          size={16}
          aria-hidden="true"
        />
      )}

      <span>{children}</span>
    </button>
  );
}

export default DownloadPreviewButton;