import cloudinary.uploader
from fastapi import UploadFile, HTTPException

async def upload_to_cloudinary(image: UploadFile) -> str:
    try:
        contents = await image.read()
        result = cloudinary.uploader.upload(
            contents,
            folder="marketplace_images",
            transformation=[
                {"width": 300, "height": 500, "crop": "fill", "gravity": "auto"}
            ]
        )
        url = result.get("secure_url")
        if not url:
            raise HTTPException(status_code=500, detail="Cloudinary upload failed")
        return url
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {e}")