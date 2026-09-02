"use client";

import { useRef } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DocumentUploader({
  docs,
  onDocChange,
  onAddDocs,
  onRemoveDoc,
  requireFields = true,
}) {
  const fileInputRef = useRef();

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);

    const newDocs = files.map((file) => ({
      name: file.name,
      file,
    }));

    onAddDocs(newDocs);
  };


  //const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']

  return (
    <div>
              {/* 🔹 Upload Area */}
              {/* <div
                style={{
                  border: "2px dashed #ccc",
                  padding: "2rem",
                  textAlign: "center",
                  borderRadius: "10px",
                  marginBottom: "1.5rem",
                  cursor: "pointer",
                }}
                onClick={() => fileInputRef.current.click()}
              >
                <Typography variant="h6">Click or drag files to upload</Typography>
                <Typography variant="body2" color="textSecondary">
                  PDF, JPG, PNG supported
                </Typography>

                <input
                  type="file"
                  multiple
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.jpg,.png"
                required/>
              </div> */}

              {/* 🔹 File List */}
              {docs.map((doc, index) => (
                <Card key={index} style={{ marginBottom: "1rem" }}>
                  <CardContent>
                 

                    <Typography variant="subtitle1">{doc.name}</Typography>

                    <div style={{ marginTop: "0.75rem" }}>
                        <Typography variant="body2">
                          {doc.file?.name || "No file selected"}
                        </Typography>
                    </div>
                      {/*take file input, with accepted types only*/}
                    <div style={{ marginTop: "1rem" , display: "flex", alignItems: "center", gap: "1rem" }}>
                      <Button
                        variant="contained"
                        component="label"
                        size="small"
                      >
                        Add File
                        <input
                          type="file"
                          hidden
                          accept=".pdf,.jpg,.png"
                          onChange={(e) =>
                            onDocChange(index, "file", e.target.files[0])
                          }
                    
                        />  

                      
                      </Button>
               
                      <TextField
                          label = "Expiry Date"
                          type="date"
                          size = 'small'
                          value={doc.expiry_date || ""}
                          onChange={(e) =>
                            onDocChange(index, "expiry_date", e.target.value)
                          }
                          slotProps={{inputLabel :{shrink: true}}}
                          required = {requireFields} // done so that the user can bypass current set up where each document is required to be input
                      />
                     
                 
                    </div>
                  </CardContent>
                </Card>
              ))}
    </div>
  );
}


   {/* <l1
                      label="Document Name"
                      value={doc.name}
                      onChange={(e) =>
                        onDocChange(index, "name", e.target.value)
                      }
                      fullWidth
                    /> */}

     {/* <Button
                        onClick={() => onRemoveDoc(index)}
                        startIcon={<DeleteIcon />}
                        color="error"
                        style={{ marginLeft: "1rem" }}
                      >
                        Remove  
                      </Button> */}