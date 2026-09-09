import { useEffect, useState } from "react";

import "./Documents.css";


function Documents({
  user,
  language = "English",
  onBack
}) {


  // ==========================================
  // DOCUMENTS
  // ==========================================

  const [documents, setDocuments] =
    useState([

      {
        id: "aadhaar",
        name: "Aadhaar Card",
        icon: "🪪",
        file: null,
        savedPath: null,
        savedName: null
      },

      {
        id: "pan",
        name: "PAN Card",
        icon: "💳",
        file: null,
        savedPath: null,
        savedName: null
      },

      {
        id: "driving",
        name: "Driving Licence",
        icon: "🚗",
        file: null,
        savedPath: null,
        savedName: null
      },

      {
        id: "voter",
        name: "Voter ID",
        icon: "🗳️",
        file: null,
        savedPath: null,
        savedName: null
      },

      {
        id: "passport",
        name: "Passport",
        icon: "📘",
        file: null,
        savedPath: null,
        savedName: null
      },

      {
        id: "photo",
        name: "Passport Size Photo",
        icon: "📷",
        file: null,
        savedPath: null,
        savedName: null
      }

    ]);


  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] =
    useState(true);


  const [message, setMessage] =
    useState("");


  // ==========================================
  // GET SAVED DOCUMENTS
  // ==========================================

  useEffect(() => {

    if (
      !user?.user_id
    ) {

      setLoading(false);

      return;

    }


    loadDocuments();

  }, [user]);


  async function loadDocuments() {

    try {

      setLoading(true);


      const response =
        await fetch(

          `http://localhost:5000/api/documents/${user.user_id}`

        );


      const data =
        await response.json();


      if (!response.ok) {

        setLoading(false);

        return;

      }


      setDocuments(

        (previousDocuments) =>

          previousDocuments.map(
            (document) => {

              const savedDocument =
                data.documents.find(

                  (saved) =>
                    saved.document_type ===
                    document.id

                );


              if (
                savedDocument
              ) {

                return {

                  ...document,

                  savedPath:
                    savedDocument.document_path,

                  savedName:
                    savedDocument.document_name

                };

              }


              return document;

            }

          )

      );


    } catch (error) {

      console.error(
        "Load documents error:",
        error
      );

    } finally {

      setLoading(false);

    }

  }


  // ==========================================
  // UPLOAD DOCUMENT
  // ==========================================

  async function handleUpload(
    id,
    event
  ) {

    const selectedFile =
      event.target.files[0];


    if (
      !selectedFile
    ) {

      return;

    }


    try {

      setMessage(
        "Uploading document..."
      );


      const formData =
        new FormData();


      formData.append(

        "userId",

        user.user_id

      );


      formData.append(

        "documentType",

        id

      );


      formData.append(

        "document",

        selectedFile

      );


      const response =
        await fetch(

          "http://localhost:5000/api/documents/upload",

          {

            method:
              "POST",

            body:
              formData

          }

        );


      const data =
        await response.json();


      if (
        !response.ok
      ) {

        setMessage(

          data.message ||
          "Unable to upload document."

        );

        return;

      }


      setDocuments(

        documents.map(
          (document) => {

            if (
              document.id === id
            ) {

              return {

                ...document,

                file:
                  selectedFile,

                savedPath:
                  data.document.documentPath,

                savedName:
                  data.document.documentName

              };

            }


            return document;

          }

        )

      );


      setMessage(
        "Document uploaded successfully!"
      );


    } catch (error) {

      console.error(
        "Upload error:",
        error
      );


      setMessage(
        "Unable to connect to server."
      );

    }

  }


  // ==========================================
  // REMOVE DOCUMENT
  // ==========================================

  async function removeDocument(
    id
  ) {

    try {

      const response =
        await fetch(

          `http://localhost:5000/api/documents/${user.user_id}/${id}`,

          {

            method:
              "DELETE"

          }

        );


      const data =
        await response.json();


      if (
        !response.ok
      ) {

        setMessage(

          data.message ||
          "Unable to remove document."

        );

        return;

      }


      setDocuments(

        documents.map(
          (document) => {

            if (
              document.id === id
            ) {

              return {

                ...document,

                file:
                  null,

                savedPath:
                  null,

                savedName:
                  null

              };

            }


            return document;

          }

        )

      );


      setMessage(
        "Document removed successfully."
      );


    } catch (error) {

      setMessage(
        "Unable to connect to server."
      );

    }

  }


  // ==========================================
  // COUNT
  // ==========================================

  const uploadedCount =
    documents.filter(

      (document) =>

        document.file ||
        document.savedPath

    ).length;


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="documents-page">


      <header className="documents-header">

        <div>

          <h2>
            Hamara Saathi
          </h2>

          <p>
            YOUR DIGITAL SAATHI 🤝
          </p>

        </div>


        <button
          className="documents-back-top"
          onClick={onBack}
        >

          ← Dashboard

        </button>

      </header>


      <section className="documents-intro">

        <p>
          DOCUMENT MANAGEMENT
        </p>

        <h1>
          Upload Your Documents
        </h1>

        <span>
          Upload and manage your important documents.
        </span>

      </section>


      <section className="documents-status">

        <div className="status-number">

          <h2>
            {uploadedCount}
          </h2>

          <p>
            Documents Uploaded
          </p>

        </div>


        <div className="status-number">

          <h2>
            {documents.length - uploadedCount}
          </h2>

          <p>
            Documents Pending
          </p>

        </div>


        <div className="status-number">

          <h2>
            {documents.length}
          </h2>

          <p>
            Total Documents
          </p>

        </div>

      </section>


      {message && (

        <p
          style={{
            textAlign: "center",
            margin: "20px"
          }}
        >

          {message}

        </p>

      )}


      {loading ? (

        <p
          style={{
            textAlign: "center"
          }}
        >

          Loading your saved documents...

        </p>

      ) : (

        <section className="documents-container">


          {documents.map(
            (document) => {

              const isUploaded =
                document.file ||
                document.savedPath;


              let imageSource =
                null;


              if (
                document.file &&
                document.file.type.startsWith(
                  "image/"
                )
              ) {

                imageSource =
                  URL.createObjectURL(
                    document.file
                  );

              }


              else if (
                document.savedPath
              ) {

                imageSource =
                  `http://localhost:5000${document.savedPath}`;

              }


              return (

                <div
                  className="document-card"
                  key={document.id}
                >


                  <div className="document-icon">

                    {document.icon}

                  </div>


                  <h3>

                    {document.name}

                  </h3>


                  {isUploaded ? (

                    <div className="document-uploaded">

                      <span>
                        ✓ Uploaded
                      </span>

                      <p>

                        {document.savedName ||
                          document.file?.name}

                      </p>

                    </div>

                  ) : (

                    <div className="document-pending">

                      ⏳ Pending Upload

                    </div>

                  )}


                  {imageSource && (

                    <img
                      className="document-preview"
                      src={imageSource}
                      alt={document.name}
                    />

                  )}


                  <label
                    className="document-upload-button"
                  >

                    {isUploaded
                      ? "Change Document"
                      : "Upload Document"}

                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(event) =>
                        handleUpload(
                          document.id,
                          event
                        )
                      }
                    />

                  </label>


                  {isUploaded && (

                    <button
                      className="document-remove-button"
                      onClick={() =>
                        removeDocument(
                          document.id
                        )
                      }
                    >

                      Remove

                    </button>

                  )}

                </div>

              );

            }

          )}

        </section>

      )}


      <div className="documents-bottom">

        <button
          className="documents-back-button"
          onClick={onBack}
        >

          ← Back to Dashboard

        </button>

      </div>


    </div>

  );

}


export default Documents;