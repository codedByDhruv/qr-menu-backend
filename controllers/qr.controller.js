import QRCode from "qrcode";
import Project from "../models/Project.js";
import Content from "../models/Content.js";

export const createQR = async (req, res) => {
  try {
    const slug = Date.now().toString();

    const project = await Project.create({
      ownerId: req.user.id,
      title: req.body.title,
      slug,
      scanCount: 0,
      isActive: true,
    });

    await Content.create({
      projectId: project._id,
      type: req.file.mimetype,
      url: `${process.env.BASE_URL}/uploads/${req.file.filename}`,
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "QR Creation Failed" });
  }
};

export const getQR = async (req, res) => {
  const data = await Project.find({ ownerId: req.user.id }).sort({ _id: -1 });
  res.json(data);
};

export const getQRImage = async (req, res) => {
  const url = `${process.env.BASE_URL}/p/${req.params.slug}`;
  const qr = await QRCode.toDataURL(url);
  res.json({ qr });
};

export const getPublicQR = async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project || !project.isActive)
    return res.status(404).json({ message: "Invalid QR" });

  const content = await Content.findOne({ projectId: project._id });
  res.json(content);
};
