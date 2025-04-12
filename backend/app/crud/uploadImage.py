import cloudinary.uploader
from fastapi import UploadFile, HTTPException

async def upload_to_cloudinary(image: UploadFile) -> str:
    # Validate file type
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files allowed")
    
    # Validate file size (e.g., 5MB max)
    contents = await image.read()
    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large (max 5MB)")
    
    try:
        result = cloudinary.uploader.upload(
            contents,
            folder="marketplace_images",
            transformation=[
                {"width": 300, "height": 500, "crop": "fill", "gravity": "auto"}
            ]
        )
        url = result.get("secure_url")
        if not url:
            raise HTTPException(status_code=500, detail="API is overloaded")
        return url
    except Exception as e:
        # all exceptions are logged as the same error
        raise HTTPException(status_code=500, detail="Upload failed")