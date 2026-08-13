import { useState } from "react";
import { Download } from "lucide-react";
import { downloadWithWatermark } from "../utils/downloadWithWatermark";

function WatermarkDownloadButton({
  imageUrl,
  fileName = "design.png",
  watermarkText = "LIMITLESS DESIGN",
  className = "",
  buttonText = "Download",
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!imageUrl || isDownloading) return;

    try {
      setIsDownloading(true);

      await downloadWithWatermark(
        imageUrl,
        fileName,
        watermarkText
      );
    } catch (error) {
      console.error("Download failed:", error);

      alert(
        "Unable to download this image. Please check the image path."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleDownload}
      disabled={isDownloading}
    >
      <Download size={15} />

      {isDownloading ? "Preparing..." : buttonText}
    </button>
  );
}

export default WatermarkDownloadButton;