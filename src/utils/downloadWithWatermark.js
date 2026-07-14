export const downloadWithWatermark = (
  imageUrl,
  fileName = "design.png",
  watermarkText = "LIMITLESS DESIGN"
) => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.crossOrigin = "anonymous";

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas is not supported."));
          return;
        }

        // Match canvas size with original image
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        // Draw original image
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Responsive watermark font size
        const fontSize = Math.max(
          22,
          Math.floor(
            Math.min(canvas.width, canvas.height) * 0.05
          )
        );

        ctx.save();

        // Move canvas origin to the centre
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Rotate watermark
        ctx.rotate(-Math.PI / 6);

        ctx.font = `700 ${fontSize}px Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const textWidth = ctx.measureText(watermarkText).width;
        const horizontalGap = textWidth + fontSize * 2;
        const verticalGap = fontSize * 3.5;

        // Add repeated watermark across the complete image
        for (
          let y = -canvas.height * 1.5;
          y <= canvas.height * 1.5;
          y += verticalGap
        ) {
          for (
            let x = -canvas.width * 1.5;
            x <= canvas.width * 1.5;
            x += horizontalGap
          ) {
            ctx.lineWidth = Math.max(2, fontSize * 0.06);
            ctx.strokeStyle = "rgba(0, 0, 0, 0.28)";
            ctx.strokeText(watermarkText, x, y);

            ctx.fillStyle = "rgba(255, 255, 255, 0.38)";
            ctx.fillText(watermarkText, x, y);
          }
        }

        ctx.restore();

        // Convert canvas into downloadable PNG
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(
                new Error("Unable to generate watermarked image.")
              );
              return;
            }

            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = downloadUrl;
            link.download = fileName.endsWith(".png")
              ? fileName
              : `${fileName}.png`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            setTimeout(() => {
              URL.revokeObjectURL(downloadUrl);
            }, 1000);

            resolve();
          },
          "image/png",
          1
        );
      } catch (error) {
        reject(error);
      }
    };

    image.onerror = () => {
      reject(
        new Error(
          "Image could not be loaded. Check the image path."
        )
      );
    };

    image.src = imageUrl;
  });
};