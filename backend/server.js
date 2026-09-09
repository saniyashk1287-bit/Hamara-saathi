const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const { createCanvas } = require("@napi-rs/canvas");
const { createWorker } = require("tesseract.js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsFolder = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder, { recursive: true });
}

app.use("/uploads", express.static(uploadsFolder));


// ======================================================
// MULTER UPLOAD SETUP
// ======================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsFolder),

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1000000);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024
  }
});


// ======================================================
// MYSQL CONNECTION
// ======================================================

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// ======================================================
// TEST MYSQL CONNECTION
// ======================================================

async function testDatabase() {
  try {
    const connection = await db.getConnection();

    console.log("MySQL connected successfully.");

    connection.release();
  } catch (error) {
    console.error(
      "MySQL connection failed:",
      error.message
    );
  }
}

testDatabase();


// ======================================================
// TEST BACKEND
// ======================================================

app.get("/", (req, res) => {
  res.json({
    message: "Hamara Saathi backend is running."
  });
});


// ======================================================
// REGISTER
// ======================================================

app.post("/api/register", async (req, res) => {
  try {

    const {
      fullName,
      email,
      phone,
      password
    } = req.body;


    if (
      !fullName ||
      !email ||
      !phone ||
      !password
    ) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }


    const [existingUsers] =
      await db.execute(
        "SELECT user_id FROM users WHERE email = ? OR phone = ?",
        [email, phone]
      );


    if (existingUsers.length > 0) {
      return res.status(409).json({
        message:
          "An account with this email or mobile number already exists."
      });
    }


    const hashedPassword =
      await bcrypt.hash(password, 10);


    const [result] =
      await db.execute(
        `INSERT INTO users
        (full_name, email, phone, password)
        VALUES (?, ?, ?, ?)`,
        [
          fullName,
          email,
          phone,
          hashedPassword
        ]
      );


    const [users] =
      await db.execute(
        `SELECT
          user_id,
          full_name,
          email,
          phone
        FROM users
        WHERE user_id = ?`,
        [result.insertId]
      );


    res.status(201).json({
      message:
        "Account created successfully.",
      user: users[0]
    });

  } catch (error) {

    console.error(
      "Registration error:",
      error
    );

    res.status(500).json({
      message:
        "Server error during registration."
    });
  }
});


// ======================================================
// LOGIN
// ======================================================

app.post("/api/login", async (req, res) => {
  try {

    const {
      loginInput,
      password
    } = req.body;


    if (!loginInput || !password) {
      return res.status(400).json({
        message:
          "Email/mobile number and password are required."
      });
    }


    const [users] =
      await db.execute(
        `SELECT
          user_id,
          full_name,
          email,
          phone,
          password
        FROM users
        WHERE email = ? OR phone = ?
        LIMIT 1`,
        [
          loginInput,
          loginInput
        ]
      );


    if (!users.length) {
      return res.status(401).json({
        message:
          "Invalid email/mobile number or password."
      });
    }


    const user = users[0];


    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!passwordMatch) {
      return res.status(401).json({
        message:
          "Invalid email/mobile number or password."
      });
    }


    delete user.password;


    res.status(200).json({
      message: "Login successful.",
      user
    });

  } catch (error) {

    console.error(
      "Login error:",
      error
    );

    res.status(500).json({
      message:
        "Server error during login."
    });
  }
});


// ======================================================
// SAVE PROFILE
// ======================================================

app.post("/api/profile", async (req, res) => {
  try {

    const {
      userId,
      fullName,
      email,
      phone,
      dateOfBirth,
      age,
      gender,
      education,
      occupation,
      category,
      address,
      city,
      state,
      pincode,
      aadhaarNumber,
      panNumber,
      voterId
    } = req.body;


    if (!userId) {
      return res.status(400).json({
        message: "User ID is required."
      });
    }


    if (
      !fullName ||
      !email ||
      !phone ||
      !dateOfBirth ||
      !age ||
      !gender ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        message:
          "Please fill in all required fields."
      });
    }


    await db.execute(
      `UPDATE users
       SET full_name = ?,
           email = ?,
           phone = ?
       WHERE user_id = ?`,
      [
        fullName,
        email,
        phone,
        userId
      ]
    );


    const [existingProfile] =
      await db.execute(
        `SELECT profile_id
         FROM user_profiles
         WHERE user_id = ?`,
        [userId]
      );


    const values = [
      dateOfBirth,
      age,
      gender,
      address,
      city,
      state,
      pincode,
      aadhaarNumber || null,
      panNumber || null,
      voterId || null,
      category || null,
      education || null,
      occupation || null,
      userId
    ];


    if (existingProfile.length) {

      await db.execute(
        `UPDATE user_profiles SET
          date_of_birth = ?,
          age = ?,
          gender = ?,
          address = ?,
          city = ?,
          state = ?,
          pincode = ?,
          aadhaar_number = ?,
          pan_number = ?,
          voter_id = ?,
          category = ?,
          education = ?,
          occupation = ?
         WHERE user_id = ?`,
        values
      );

    } else {

      await db.execute(
        `INSERT INTO user_profiles
        (
          user_id,
          date_of_birth,
          age,
          gender,
          address,
          city,
          state,
          pincode,
          aadhaar_number,
          pan_number,
          voter_id,
          category,
          education,
          occupation
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          dateOfBirth,
          age,
          gender,
          address,
          city,
          state,
          pincode,
          aadhaarNumber || null,
          panNumber || null,
          voterId || null,
          category || null,
          education || null,
          occupation || null
        ]
      );
    }


    const [profiles] =
      await db.execute(
        `SELECT
          p.*,
          u.full_name,
          u.email,
          u.phone
        FROM user_profiles p
        JOIN users u
          ON p.user_id = u.user_id
        WHERE p.user_id = ?
        LIMIT 1`,
        [userId]
      );


    res.status(200).json({
      message:
        "Profile saved successfully.",
      profile: profiles[0]
    });

  } catch (error) {

    console.error(
      "Profile save error:",
      error
    );

    res.status(500).json({
      message:
        "Unable to save profile."
    });
  }
});


// ======================================================
// GET PROFILE
// ======================================================

app.get(
  "/api/profile/:userId",
  async (req, res) => {

    try {

      const [profiles] =
        await db.execute(
          `SELECT
            p.*,
            u.full_name,
            u.email,
            u.phone
          FROM user_profiles p
          JOIN users u
            ON p.user_id = u.user_id
          WHERE p.user_id = ?
          LIMIT 1`,
          [req.params.userId]
        );


      if (!profiles.length) {
        return res.status(404).json({
          message:
            "Profile not found."
        });
      }


      res.status(200).json({
        profile: profiles[0]
      });

    } catch (error) {

      console.error(
        "Get profile error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to get profile."
      });
    }
  }
);


// ======================================================
// DOCUMENT UPLOAD
// ======================================================

app.post(
  "/api/documents/upload",
  upload.single("document"),
  async (req, res) => {

    try {

      const {
        userId,
        documentType
      } = req.body;


      if (
        !userId ||
        !documentType ||
        !req.file
      ) {
        return res.status(400).json({
          message:
            "User ID, document type and document are required."
        });
      }


      const [existingDocuments] =
        await db.execute(
          `SELECT document_id
           FROM documents
           WHERE user_id = ?
           AND document_type = ?`,
          [
            userId,
            documentType
          ]
        );


      if (existingDocuments.length) {

        await db.execute(
          `DELETE FROM documents
           WHERE user_id = ?
           AND document_type = ?`,
          [
            userId,
            documentType
          ]
        );
      }


      const documentPath =
        `/uploads/${req.file.filename}`;


      await db.execute(
        `INSERT INTO documents
        (
          user_id,
          document_type,
          document_name,
          document_path,
          verification_status
        )
        VALUES (?, ?, ?, ?, ?)`,
        [
          userId,
          documentType,
          req.file.originalname,
          documentPath,
          "Uploaded"
        ]
      );


      res.status(200).json({

        message:
          "Document uploaded successfully.",

        document: {

          userId,

          documentType,

          documentName:
            req.file.originalname,

          documentPath,

          verificationStatus:
            "Uploaded"
        }
      });

    } catch (error) {

      console.error(
        "Document upload error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to upload document."
      });
    }
  }
);


// ======================================================
// GET DOCUMENTS
// ======================================================

app.get(
  "/api/documents/:userId",
  async (req, res) => {

    try {

      const [documents] =
        await db.execute(
          `SELECT
            document_id,
            user_id,
            document_type,
            document_name,
            document_path,
            verification_status,
            uploaded_at
          FROM documents
          WHERE user_id = ?
          ORDER BY uploaded_at DESC`,
          [req.params.userId]
        );


      res.status(200).json({
        documents
      });

    } catch (error) {

      console.error(
        "Get documents error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to get documents."
      });
    }
  }
);


// ======================================================
// DELETE DOCUMENT
// ======================================================

app.delete(
  "/api/documents/:documentId",
  async (req, res) => {

    try {

      const [documents] =
        await db.execute(
          `SELECT *
           FROM documents
           WHERE document_id = ?`,
          [req.params.documentId]
        );


      if (!documents.length) {
        return res.status(404).json({
          message:
            "Document not found."
        });
      }


      const document =
        documents[0];


      await db.execute(
        `DELETE FROM documents
         WHERE document_id = ?`,
        [req.params.documentId]
      );


      if (document.document_path) {

        const filePath =
          path.join(
            __dirname,
            document.document_path.replace("/", "")
          );


        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }


      res.status(200).json({
        message:
          "Document deleted successfully."
      });

    } catch (error) {

      console.error(
        "Delete document error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to delete document."
      });
    }
  }
);


// ======================================================
// FORM-FILLING: PROFILE DATA
// ======================================================

function cleanValue(value) {

  return value === null ||
    value === undefined
    ? ""
    : String(value).trim();
}


function formatDate(value) {

  const valueText =
    cleanValue(value);

  if (!valueText) return "";

  const dateOnly =
    valueText.split("T")[0];

  const parts =
    dateOnly.split("-");

  return parts.length === 3
    ? `${parts[2]}/${parts[1]}/${parts[0]}`
    : dateOnly;
}


function getProfileMap(profile, user) {

  return {

    fullName:
      cleanValue(
        user?.full_name ||
        profile?.full_name
      ),

    email:
      cleanValue(
        user?.email ||
        profile?.email
      ),

    phone:
      cleanValue(
        user?.phone ||
        profile?.phone
      ),

    dateOfBirth:
      formatDate(
        profile?.date_of_birth
      ),

    age:
      cleanValue(
        profile?.age
      ),

    gender:
      cleanValue(
        profile?.gender
      ),

    education:
      cleanValue(
        profile?.education
      ),

    occupation:
      cleanValue(
        profile?.occupation
      ),

    category:
      cleanValue(
        profile?.category
      ),

    address:
      cleanValue(
        profile?.address
      ),

    city:
      cleanValue(
        profile?.city
      ),

    state:
      cleanValue(
        profile?.state
      ),

    pincode:
      cleanValue(
        profile?.pincode
      ),

    aadhaar:
      cleanValue(
        profile?.aadhaar_number
      ),

    pan:
      cleanValue(
        profile?.pan_number
      ),

    voterId:
      cleanValue(
        profile?.voter_id
      )
  };
}


function normalizeText(text) {

  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}


const fieldDefinitions = [

  {
    key: "fullName",
    labels: [
      "full name",
      "name of applicant",
      "applicant name",
      "applicant's name",
      "name",
      "candidate name",
      "beneficiary name",
      "नाम",
      "पूरा नाम",
      "पूर्ण नाव"
    ]
  },

  {
    key: "dateOfBirth",
    labels: [
      "date of birth",
      "birth date",
      "dob",
      "birthdate",
      "जन्म तिथि",
      "जन्म तारीख",
      "जन्मतिथि"
    ]
  },

  {
    key: "phone",
    labels: [
      "mobile number",
      "mobile no",
      "mobile",
      "phone number",
      "contact number",
      "telephone number",
      "मोबाइल नंबर",
      "मोबाइल क्रमांक"
    ]
  },

  {
    key: "email",
    labels: [
      "email address",
      "email",
      "email id",
      "e-mail",
      "ईमेल"
    ]
  },

  {
    key: "gender",
    labels: [
      "gender",
      "sex",
      "लिंग"
    ]
  },

  {
    key: "age",
    labels: [
      "age",
      "आयु",
      "वय"
    ]
  },

  {
    key: "education",
    labels: [
      "education",
      "educational qualification",
      "qualification",
      "highest qualification",
      "शिक्षा",
      "शैक्षणिक योग्यता"
    ]
  },

  {
    key: "occupation",
    labels: [
      "occupation",
      "profession",
      "job",
      "employment",
      "व्यवसाय",
      "पेशा"
    ]
  },

  {
    key: "category",
    labels: [
      "category",
      "caste category",
      "social category",
      "श्रेणी",
      "प्रवर्ग"
    ]
  },

  {
    key: "address",
    labels: [
      "address",
      "residential address",
      "permanent address",
      "present address",
      "communication address",
      "पता",
      "पत्ता"
    ]
  },

  {
    key: "city",
    labels: [
      "city",
      "town",
      "district",
      "शहर",
      "नगर",
      "जिला"
    ]
  },

  {
    key: "state",
    labels: [
      "state",
      "state name",
      "राज्य"
    ]
  },

  {
    key: "pincode",
    labels: [
      "pin code",
      "pincode",
      "postal code",
      "zip code",
      "zip",
      "पिनकोड",
      "पिन कोड"
    ]
  },

  {
    key: "aadhaar",
    labels: [
      "aadhaar number",
      "aadhar number",
      "aadhaar no",
      "uid number",
      "uid",
      "आधार नंबर",
      "आधार क्रमांक"
    ]
  },

  {
    key: "pan",
    labels: [
      "pan number",
      "pan no",
      "pan card number",
      "pan",
      "पैन नंबर",
      "पैन क्रमांक"
    ]
  },

  {
    key: "voterId",
    labels: [
      "voter id",
      "voter id number",
      "epic number",
      "epic",
      "वोटर आईडी"
    ]
  }
];


function findLabelMatches(words) {

  const usable =
    (words || [])

      .filter(
        w => w?.text && w?.bbox
      )

      .map(w => ({

        text:
          w.text.trim(),

        norm:
          normalizeText(w.text),

        x0:
          w.bbox.x0,

        y0:
          w.bbox.y0,

        x1:
          w.bbox.x1,

        y1:
          w.bbox.y1,

        cy:
          (w.bbox.y0 +
            w.bbox.y1) / 2,

        confidence:
          Number(
            w.confidence || 0
          )
      }))

      .filter(
        w => w.confidence >= 15
      );


  const results = [];


  for (const def of fieldDefinitions) {

    let best = null;


    for (
      let i = 0;
      i < usable.length;
      i++
    ) {

      for (const label of def.labels) {

        const parts =
          label
            .split(/\s+/)
            .map(normalizeText)
            .filter(Boolean);


        const found = [];

        let cursor = i;


        for (const part of parts) {

          let index = -1;


          for (
            let j = cursor;
            j <
            Math.min(
              cursor + 4,
              usable.length
            );
            j++
          ) {

            if (
              Math.abs(
                usable[j].cy -
                usable[i].cy
              ) > 40
            ) {
              continue;
            }


            if (
              usable[j].norm === part ||
              usable[j].norm.includes(part) ||
              part.includes(
                usable[j].norm
              )
            ) {

              index = j;

              break;
            }
          }


          if (index < 0) break;


          found.push(
            usable[index]
          );

          cursor =
            index + 1;
        }


        if (
          found.length ===
          parts.length
        ) {

          const first =
            found[0];

          const last =
            found[found.length - 1];


          const score =
            found.reduce(
              (sum, w) =>
                sum + w.confidence,
              0
            ) / found.length;


          if (
            !best ||
            score > best.score
          ) {

            best = {
              key: def.key,
              first,
              last,
              score
            };
          }
        }
      }
    }


    if (best) {
      results.push(best);
    }
  }


  return results;
}


function calculatePlacement(
  match,
  value,
  width,
  height
) {

  const labelHeight =
    Math.max(
      12,
      match.last.y1 -
      match.first.y0
    );


  let fontSize =
    Math.max(
      10,
      Math.min(
        17,
        Math.round(
          labelHeight * 0.9
        )
      )
    );


  const estimatedWidth =
    String(value).length *
    fontSize *
    0.52;


  let x =
    match.last.x1 + 12;

  let yTop =
    match.first.y0;


  if (
    x + estimatedWidth >
    width - 10
  ) {

    x =
      match.first.x0;

    yTop =
      match.last.y1 +
      Math.max(
        7,
        labelHeight * 0.35
      );
  }


  if (
    x + estimatedWidth >
    width - 5
  ) {

    fontSize =
      Math.max(
        8,
        Math.floor(
          (width - x - 8) /
          Math.max(
            1,
            String(value).length *
              0.52
          )
        )
      );
  }


  if (
    yTop + fontSize >
    height - 5
  ) {

    yTop =
      height -
      fontSize -
      5;
  }


  return {
    x,
    yTop,
    fontSize
  };
}


function createOverlays(
  ocrData,
  profileData,
  width,
  height
) {

  const matches =
    findLabelMatches(
      ocrData.words
    );


  const overlays = [];

  const used = new Set();


  for (const match of matches) {

    const value =
      profileData[match.key];


    if (!value) continue;


    const pos =
      calculatePlacement(
        match,
        value,
        width,
        height
      );


    const key =
      `${match.key}-${Math.round(
        match.first.x0
      )}-${Math.round(
        match.first.y0
      )}`;


    if (used.has(key)) continue;


    used.add(key);


    overlays.push({

      key:
        match.key,

      value:
        String(value),

      x:
        pos.x,

      yTop:
        pos.yTop,

      fontSize:
        pos.fontSize
    });
  }


  return overlays;
}


// ======================================================
// OCR WORKER
// ======================================================

let workerPromise = null;


async function getOcrWorker() {

  if (!workerPromise) {
    workerPromise =
      createWorker("eng");
  }

  return workerPromise;
}


async function ocrImage(buffer) {

  const worker =
    await getOcrWorker();

  const result =
    await worker.recognize(buffer);

  return result.data;
}


// ======================================================
// IMAGE FORM → PDF
// ======================================================

async function processImage(
  filePath,
  profileData
) {

  const source =
    await fs.promises.readFile(
      filePath
    );


  const image =
    sharp(source);


  const meta =
    await image.metadata();


  const originalWidth =
    meta.width || 1500;

  const originalHeight =
    meta.height || 2100;


  const maxWidth = 2000;


  const ocrFactor =
    originalWidth > maxWidth
      ? maxWidth / originalWidth
      : 1;


  const ocrBuffer =
    await image
      .resize({
        width:
          Math.round(
            originalWidth *
            ocrFactor
          )
      })
      .png()
      .toBuffer();


  const ocrMetaWidth =
    Math.round(
      originalWidth *
      ocrFactor
    );


  const ocrMetaHeight =
    Math.round(
      originalHeight *
      ocrFactor
    );


  const ocrData =
    await ocrImage(
      ocrBuffer
    );


  const overlays =
    createOverlays(
      ocrData,
      profileData,
      ocrMetaWidth,
      ocrMetaHeight
    );


  const finalImage =
    await image
      .png()
      .toBuffer();


  const pdfDoc =
    await PDFDocument.create();


  const pageWidth =
    originalWidth * 0.75;


  const pageHeight =
    originalHeight * 0.75;


  const page =
    pdfDoc.addPage([
      pageWidth,
      pageHeight
    ]);


  const embedded =
    meta.format === "jpeg" ||
    meta.format === "jpg"

      ? await pdfDoc.embedJpg(
          source
        )

      : await pdfDoc.embedPng(
          finalImage
        );


  page.drawImage(
    embedded,
    {
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight
    }
  );


  await drawOverlays(
    pdfDoc,
    page,
    overlays,
    ocrMetaWidth,
    ocrMetaHeight,
    pageWidth,
    pageHeight
  );


  return {
    bytes:
      await pdfDoc.save(),

    overlays,

    pages: 1
  };
}


// ======================================================
// PDF → IMAGE PAGES → OCR
// ======================================================

async function renderPdfPages(
  pdfBytes
) {

  const pdfjsLib =
    await import(
      "pdfjs-dist/legacy/build/pdf.mjs"
    );


  const loadingTask =
    pdfjsLib.getDocument({

      data:
        new Uint8Array(
          pdfBytes
        ),

      disableWorker:
        true
    });


  const pdf =
    await loadingTask.promise;


  const pages = [];


  for (
    let number = 1;
    number <= pdf.numPages;
    number++
  ) {

    const page =
      await pdf.getPage(
        number
      );


    const viewport =
      page.getViewport({
        scale: 2
      });


    const canvas =
      createCanvas(
        Math.ceil(
          viewport.width
        ),
        Math.ceil(
          viewport.height
        )
      );


    const context =
      canvas.getContext(
        "2d"
      );


    await page.render({

      canvasContext:
        context,

      viewport

    }).promise;


    pages.push({

      pageNumber:
        number,

      png:
        canvas.toBuffer(
          "image/png"
        ),

      width:
        viewport.width,

      height:
        viewport.height
    });
  }


  return pages;
}


async function drawOverlays(
  pdfDoc,
  page,
  overlays,
  imageWidth,
  imageHeight,
  pdfWidth,
  pdfHeight
) {

  if (!overlays.length)
    return;


  const font =
    await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );


  const scaleX =
    pdfWidth /
    imageWidth;


  const scaleY =
    pdfHeight /
    imageHeight;


  for (
    const overlay of overlays
  ) {

    const size =
      Math.max(
        8,
        overlay.fontSize *
          scaleX
      );


    const x =
      Math.max(
        2,
        overlay.x *
          scaleX
      );


    const y =
      Math.max(
        2,
        pdfHeight -
          (
            overlay.yTop *
            scaleY
          ) -
          size
      );


    page.drawText(
      overlay.value,
      {

        x,

        y,

        size,

        font,

        color:
          rgb(
            0.03,
            0.03,
            0.03
          ),

        maxWidth:
          Math.max(
            20,
            pdfWidth -
              x -
              5
          )
      }
    );
  }
}


async function processScannedPdf(
  filePath,
  profileData
) {

  const source =
    await fs.promises.readFile(
      filePath
    );


  const pdfDoc =
    await PDFDocument.load(
      source,
      {
        ignoreEncryption:
          true
      }
    );


  const rendered =
    await renderPdfPages(
      source
    );


  const allOverlays = [];


  for (const p of rendered) {

    const ocrData =
      await ocrImage(
        p.png
      );


    const overlays =
      createOverlays(
        ocrData,
        profileData,
        p.width,
        p.height
      );


    const page =
      pdfDoc.getPage(
        p.pageNumber - 1
      );


    const size =
      page.getSize();


    await drawOverlays(
      pdfDoc,
      page,
      overlays,
      p.width,
      p.height,
      size.width,
      size.height
    );


    allOverlays.push(
      ...overlays.map(
        o => ({
          ...o,
          page:
            p.pageNumber
        })
      )
    );
  }


  return {

    bytes:
      await pdfDoc.save(),

    overlays:
      allOverlays,

    pages:
      rendered.length
  };
}


// ======================================================
// FILLABLE PDF HELPERS
// ======================================================

function normalizePdfFieldName(
  name
) {

  return String(name || "")
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "_"
    )
    .replace(
      /^_|_$/g,
      "");
}


const pdfAliases = {

  fullName: [
    "name",
    "full_name",
    "fullname",
    "applicant_name",
    "applicantname",
    "name_of_applicant",
    "candidate_name",
    "beneficiary_name"
  ],

  email: [
    "email",
    "email_address",
    "email_id",
    "emailid"
  ],

  phone: [
    "mobile",
    "mobile_number",
    "mobile_no",
    "phone",
    "phone_number",
    "contact_number"
  ],

  dateOfBirth: [
    "dob",
    "date_of_birth",
    "dateofbirth",
    "birth_date",
    "birthdate"
  ],

  age: [
    "age"
  ],

  gender: [
    "gender",
    "sex"
  ],

  education: [
    "education",
    "qualification",
    "educational_qualification"
  ],

  occupation: [
    "occupation",
    "profession",
    "job"
  ],

  category: [
    "category",
    "caste_category"
  ],

  address: [
    "address",
    "full_address",
    "residential_address",
    "permanent_address",
    "present_address"
  ],

  city: [
    "city",
    "town",
    "district"
  ],

  state: [
    "state",
    "state_name"
  ],

  pincode: [
    "pincode",
    "pin_code",
    "postal_code",
    "zip_code",
    "zipcode"
  ],

  aadhaar: [
    "aadhaar",
    "aadhaar_number",
    "aadhar",
    "aadhar_number",
    "uid",
    "uid_number"
  ],

  pan: [
    "pan",
    "pan_number",
    "pan_no"
  ],

  voterId: [
    "voter_id",
    "voterid",
    "voter_id_number",
    "epic_number"
  ]
};


function findPdfValue(
  fieldName,
  profileData
) {

  const field =
    normalizePdfFieldName(
      fieldName
    );


  for (
    const [
      key,
      aliases
    ]
    of Object.entries(
      pdfAliases
    )
  ) {

    if (
      aliases.includes(field) &&
      profileData[key]
    ) {

      return {
        key,
        value:
          String(
            profileData[key]
          )
      };
    }
  }


  for (
    const [
      key,
      aliases
    ]
    of Object.entries(
      pdfAliases
    )
  ) {

    if (
      aliases.some(
        alias =>
          field.includes(
            alias
          )
      ) &&
      profileData[key]
    ) {

      return {
        key,
        value:
          String(
            profileData[key]
          )
      };
    }
  }


  return null;
}


// ======================================================
// GOVERNMENT FORM AUTO-FILL
// PDF + JPG + JPEG + PNG
// ======================================================

app.post(
  "/api/form-filling/upload",
  upload.single("form"),
  async (req, res) => {

    let temporaryPath = null;


    try {

      if (!req.file) {

        return res.status(400).json({
          message:
            "Please upload a government form."
        });
      }


      temporaryPath =
        req.file.path;


      const extension =
        path.extname(
          req.file.originalname
        ).toLowerCase();


      if (
        ![
          ".pdf",
          ".jpg",
          ".jpeg",
          ".png"
        ].includes(
          extension
        )
      ) {

        return res.status(400).json({
          message:
            "Please upload a PDF, JPG, JPEG or PNG government form."
        });
      }


      const userId =
        req.body.userId;


      if (!userId) {

        return res.status(400).json({
          message:
            "User ID is required."
        });
      }


      const [users] =
        await db.execute(
          `SELECT
            user_id,
            full_name,
            email,
            phone
          FROM users
          WHERE user_id = ?
          LIMIT 1`,
          [userId]
        );


      if (!users.length) {

        return res.status(404).json({
          message:
            "User not found."
        });
      }


      const [profiles] =
        await db.execute(
          `SELECT *
           FROM user_profiles
           WHERE user_id = ?
           LIMIT 1`,
          [userId]
        );


      if (!profiles.length) {

        return res.status(400).json({
          message:
            "Please complete your profile before filling a government form."
        });
      }


      const profileData =
        getProfileMap(
          profiles[0],
          users[0]
        );


      if (
        !Object.values(
          profileData
        ).some(
          v =>
            String(
              v || ""
            ).trim()
        )
      ) {

        return res.status(400).json({
          message:
            "No profile information was found."
        });
      }


      // ------------------------
      // PDF
      // ------------------------

      if (
        extension === ".pdf"
      ) {

        const originalPdf =
          await fs.promises.readFile(
            temporaryPath
          );


        const pdfDoc =
          await PDFDocument.load(
            originalPdf,
            {
              ignoreEncryption:
                true
            }
          );


        let form = null;


        try {
          form =
            pdfDoc.getForm();
        } catch (e) {}


        const fields =
          form
            ? form.getFields()
            : [];


        // Digital / fillable PDF

        if (
          fields.length > 0
        ) {

          const filledFields = [];

          const unmatchedFields = [];


          for (
            const field of fields
          ) {

            const fieldName =
              field.getName();


            const match =
              findPdfValue(
                fieldName,
                profileData
              );


            if (!match) {

              unmatchedFields.push(
                fieldName
              );

              continue;
            }


            try {

              if (
                typeof field.setText ===
                "function"
              ) {

                field.setText(
                  match.value
                );


                filledFields.push({

                  field:
                    fieldName,

                  profileField:
                    match.key
                });

              } else if (
                typeof field.select ===
                "function"
              ) {

                field.select(
                  match.value
                );


                filledFields.push({

                  field:
                    fieldName,

                  profileField:
                    match.key
                });

              } else {

                unmatchedFields.push(
                  fieldName
                );
              }

            } catch (e) {

              unmatchedFields.push(
                fieldName
              );
            }
          }


          try {
            form.updateFieldAppearances();
          } catch (e) {}


          try {
            form.flatten();
          } catch (e) {}


          const outputName =
            `completed-form-${Date.now()}.pdf`;


          await fs.promises.writeFile(
            path.join(
              uploadsFolder,
              outputName
            ),
            await pdfDoc.save()
          );


          return res.status(200).json({

            success:
              true,

            mode:
              "fillable-pdf",

            message:
              "Government form filled successfully.",

            fileUrl:
              `http://localhost:5000/uploads/${outputName}`,

            fileName:
              outputName,

            filledFields,

            unmatchedFields
          });
        }


        // Scanned / non-fillable PDF → OCR

        const result =
          await processScannedPdf(
            temporaryPath,
            profileData
          );


        if (
          !result.overlays.length
        ) {

          return res.status(422).json({

            message:
              "The PDF was read, but no recognizable form field labels were detected. Please use a clearer form.",

            filledFields: [],

            unmatchedFields:
              fieldDefinitions.map(
                x => x.key
              )
          });
        }


        const outputName =
          `completed-form-${Date.now()}.pdf`;


        await fs.promises.writeFile(
          path.join(
            uploadsFolder,
            outputName
          ),
          result.bytes
        );


        return res.status(200).json({

          success:
            true,

          mode:
            "scanned-pdf-ocr",

          message:
            "The scanned form was read with OCR and profile details were placed beside the detected fields.",

          fileUrl:
            `http://localhost:5000/uploads/${outputName}`,

          fileName:
            outputName,

          filledFields:
            result.overlays.map(
              x => ({
                field:
                  x.key,

                profileField:
                  x.key,

                page:
                  x.page
              })
            ),

          unmatchedFields: []
        });
      }


      // ------------------------
      // JPG / JPEG / PNG
      // ------------------------

      const result =
        await processImage(
          temporaryPath,
          profileData
        );


      if (
        !result.overlays.length
      ) {

        return res.status(422).json({

          message:
            "The image was read, but no recognizable form field labels were detected. Please use a clearer form.",

          filledFields: [],

          unmatchedFields:
            fieldDefinitions.map(
              x => x.key
            )
        });
      }


      const outputName =
        `completed-form-${Date.now()}.pdf`;


      await fs.promises.writeFile(
        path.join(
          uploadsFolder,
          outputName
        ),
        result.bytes
      );


      return res.status(200).json({

        success:
          true,

        mode:
          "image-ocr",

        message:
          "The form image was read with OCR and profile details were placed beside the detected fields.",

        fileUrl:
          `http://localhost:5000/uploads/${outputName}`,

        fileName:
          outputName,

        filledFields:
          result.overlays.map(
            x => ({
              field:
                x.key,

              profileField:
                x.key
            })
          ),

        unmatchedFields: []
      });

    } catch (error) {

      console.error(
        "FORM FILLING ERROR:",
        error
      );


      res.status(500).json({

        message:
          "Unable to process the government form.",

        error:
          error.message
      });

    } finally {

      if (
        temporaryPath &&
        fs.existsSync(
          temporaryPath
        )
      ) {

        try {
          fs.unlinkSync(
            temporaryPath
          );
        } catch (e) {}
      }
    }
  }
);


// ======================================================
// START SERVER
// ======================================================

const PORT =
  process.env.PORT || 5000;


app.listen(
  PORT,
  () => {

    console.log(
      `Hamara Saathi backend running on http://localhost:${PORT}`
    );

  }
);