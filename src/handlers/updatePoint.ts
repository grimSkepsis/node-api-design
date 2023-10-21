import prisma from "../db";

export const getUpdatePoints = async (req, res, next) => {
  try {
    const updatePoints = await prisma.updatePoint.findMany({
      where: {
        update: {
          product: {
            belongsToId: req.user.id,
          },
        },
      },
    });
    res.json({ data: updatePoints });
  } catch (error) {
    next(error);
  }
};

export const getUpdatePointById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatePoint = await prisma.updatePoint.findUnique({
      where: {
        id,
        update: {
          product: {
            belongsToId: req.user.id,
          },
        },
      },
    });
    if (!updatePoint) {
      return res.status(404).json({ message: "Update point not found" });
    }
    res.json({ data: updatePoint });
  } catch (error) {
    next(error);
  }
};

export const createUpdatePoint = async (req, res, next) => {
  try {
    const { name, description, updateId } = req.body;
    const updatePoint = await prisma.updatePoint.create({
      data: {
        name,
        description,
        update: {
          connect: {
            id: updateId,
            product: {
              belongsToId: req.user.id,
            },
          },
        },
      },
    });
    res.status(201).json({ data: updatePoint });
  } catch (error) {
    next(error);
  }
};

export const updateUpdatePoint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatePoint = await prisma.updatePoint.update({
      where: {
        id,
        update: {
          product: {
            belongsToId: req.user.id,
          },
        },
      },
      data: {
        name,
        description,
      },
    });
    res.json({ data: updatePoint });
  } catch (error) {
    next(error);
  }
};

export const deleteUpdatePoint = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.updatePoint.delete({
      where: {
        id,
        update: {
          product: {
            belongsToId: req.user.id,
          },
        },
      },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
