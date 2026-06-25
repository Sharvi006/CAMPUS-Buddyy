import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Loader2, LogOut, ShieldCheck, X, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "../utils/api";

const AdminDashboard = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Filter for valid files if necessary, or just accept them
      const fileArray = Array.from(e.dataTransfer.files);
      setSelectedFiles(prev => [...prev, ...fileArray]);
    }
  };

  const fetchFiles = async () => {
    try {
      setIsLoadingFiles(true);
      const response = await fetch(`${API_BASE_URL}/api/files`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        handleLogout();
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setUploadedFiles(data.files || []);
      }
    } catch (err) {
      console.error("Failed to fetch files", err);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFiles();
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      if (response.status === 401) {
        toast({
          title: "Session Expired",
          description: "Please log in again.",
          variant: "destructive"
        });
        handleLogout();
        return;
      }

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Unauthorized");
        }
        throw new Error("Upload failed");
      }

      const data = await response.json();
      toast({
        title: "Success",
        description: `Successfully processed ${data.filenames.length} files.`,
      });
      setSelectedFiles([]);
      // clear the file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      await fetchFiles(); // Refresh the list after upload

    } catch (err: any) {
      toast({
        title: "Upload Failed",
        description: err.message === "Unauthorized" ? "You lack permissions." : "There was a problem uploading your files.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleDeleteFile = async (filename: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/files/${encodeURIComponent(filename)}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        toast({
          title: "Session Expired",
          description: "Please log in again.",
          variant: "destructive"
        });
        handleLogout();
        return;
      }
      if (!response.ok) {
        throw new Error("Failed to delete file");
      }
      toast({
        title: "File Deleted",
        description: `Successfully removed ${filename} from the knowledge base.`,
      });
      await fetchFiles();
    } catch (err) {
      toast({
        title: "Delete Failed",
        description: "Could not remove the file from the database.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary font-heading font-bold text-xl">
          <ShieldCheck className="w-6 h-6" />
          Admin Dashboard
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </header>

      <main className="max-w-4xl mx-auto p-6 mt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold tracking-tight mb-2">Knowledge Base Management</h1>
          <p className="text-muted-foreground">Upload PDFs or text files to train Buddyy's responses.</p>
        </div>

        <Card className="border-border/50 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Upload Documents
            </CardTitle>
            <CardDescription>
              Select one or more PDF/TXT files. The system will automatically extract, chunk, and embed the text into ChromaDB.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label 
                htmlFor="file-upload" 
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  isDragging 
                    ? "border-primary bg-primary/10" 
                    : "border-border bg-background/50 hover:bg-muted/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileText className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PDF or TXT (MAX. 10MB)</p>
                </div>
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  multiple 
                  accept=".pdf,.txt"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      const fileArray = Array.from(files);
                      setSelectedFiles(prev => [...prev, ...fileArray]);
                    }
                  }}
                  disabled={isUploading}
                />
              </label>
            </div>

            {selectedFiles.length > 0 && (
              <div className="text-sm">
                <p className="font-medium mb-2">Selected Files:</p>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-muted/30 border border-border/50 rounded-md p-2">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="truncate" title={file.name}>{file.name}</span>
                      </div>
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-muted-foreground hover:text-destructive flex-shrink-0 ml-2" 
                        onClick={() => removeFile(idx)}
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={handleUpload} 
              disabled={selectedFiles.length === 0 || isUploading}
              className="w-full sm:w-auto"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Upload and Train AI"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Showcase of previously uploaded files */}
        <div className="mt-10">
          <h2 className="text-xl font-heading font-bold tracking-tight mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Active Knowledge Base Documents
          </h2>
          
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-0">
              {isLoadingFiles ? (
                <div className="p-8 text-center text-muted-foreground flex flex-col items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin mb-2" />
                  Loading documents...
                </div>
              ) : uploadedFiles.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No documents found in the database.
                </div>
              ) : (
                <ul className="divide-y divide-border/50">
                  {uploadedFiles.map((filename, idx) => (
                    <li key={idx} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium truncate" title={filename}>{filename}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteFile(filename)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
