from fastapi import FastAPI, UploadFile, File
from fastapi.openapi.utils import get_openapi
import json

app = FastAPI()

@app.post("/upload")
async def upload_documents(files: list[UploadFile]):
    pass

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Test API",
        version="0.1.0",
        routes=app.routes,
    )
    if "Body_upload_documents_upload_post" in openapi_schema.get("components", {}).get("schemas", {}):
        schema = openapi_schema["components"]["schemas"]["Body_upload_documents_upload_post"]
        if "properties" in schema and "files" in schema["properties"]:
            schema["properties"]["files"]["items"] = {
                "type": "string",
                "format": "binary"
            }
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

print(json.dumps(app.openapi()["components"]["schemas"], indent=2))
