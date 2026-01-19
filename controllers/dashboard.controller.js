import Project from "../models/Project.js";

export const getStats = async (req, res) => {
  const projects = await Project.find({ ownerId: req.user.id });

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.isActive).length;
  const totalScans = projects.reduce((sum, p) => sum + p.scanCount, 0);

  res.json({ totalProjects, activeProjects, totalScans });
};
