"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementCarViews = exports.deleteCar = exports.updateCar = exports.createCar = exports.getCarById = exports.getCars = exports.processAndUploadImage = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const sharp_1 = __importDefault(require("sharp"));
const wasabi_1 = require("../services/wasabi");
const BUNNY_BASE = process.env.BUNNY_CDN_URL;
const makePublicUrl = (key) => `${BUNNY_BASE}/${key}`;
const processAndUploadImage = async (file, isMain) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    const baseName = `${timestamp}-${safeName}`;
    // folderi
    const originalKey = `cars/original/${baseName}`;
    const mediumKey = `cars/medium/${baseName}`;
    const thumbKey = `cars/thumb/${baseName}`;
    const sharpInput = (0, sharp_1.default)(file.buffer).rotate();
    // medium i thumb
    const [mediumBuffer, thumbBuffer] = await Promise.all([
        sharpInput
            .clone()
            .resize(1200)
            .jpeg({ quality: 90, mozjpeg: true })
            .toBuffer(),
        sharpInput
            .clone()
            .resize(600)
            .jpeg({ quality: 95, mozjpeg: true })
            .toBuffer(),
    ]);
    const cacheControl = "public, max-age=31536000, immutable";
    const [url, mediumUrl, thumbUrl] = await Promise.all([
        (0, wasabi_1.uploadToWasabi)(file.buffer, originalKey, {
            contentType: file.mimetype,
            cacheControl,
        }),
        (0, wasabi_1.uploadToWasabi)(mediumBuffer, mediumKey, {
            contentType: "image/jpeg",
            cacheControl,
        }),
        (0, wasabi_1.uploadToWasabi)(thumbBuffer, thumbKey, {
            contentType: "image/jpeg",
            cacheControl,
        }),
    ]);
    return { url, mediumUrl, thumbUrl, isMain };
};
exports.processAndUploadImage = processAndUploadImage;
// GET /api/cars?page=1&limit=20&brand=BMW
const getCars = async (req, res) => {
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Number(req.query.limit || 20), 100);
    const skip = (page - 1) * limit;
    const where = {};
    if (req.query.brend)
        where.brend = String(req.query.brend);
    if (req.query.model)
        where.model = String(req.query.model);
    if (req.query.godina)
        where.godina = Number(req.query.godina);
    try {
        const [total, cars] = await Promise.all([
            prisma_1.default.car.count({ where }),
            prisma_1.default.car.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    slike: { where: { isMain: true }, take: 1 },
                    brend: true,
                    oprema: { include: { oprema: true } },
                },
            }),
        ]);
        // for (const car of cars) {
        //   if (car.slike?.[0]) {
        //     car.slike[0].url = await getPresignedUrl(car.slike[0].url);
        //     car.slike[0].mediumUrl = await getPresignedUrl(car.slike[0].mediumUrl);
        //     car.slike[0].thumbUrl = await getPresignedUrl(car.slike[0].thumbUrl);
        //   }
        // }
        res.json({
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
            data: cars,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch cars" });
    }
};
exports.getCars = getCars;
const getCarById = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const car = await prisma_1.default.car.findUnique({
            where: { id },
            include: {
                slike: true,
                brend: true,
                oprema: { include: { oprema: true } },
            },
        });
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.json(car);
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch car" });
    }
};
exports.getCarById = getCarById;
const createCar = async (req, res) => {
    try {
        const { brendId, model, godina, cijena, oblikKaroserije, gorivo, mjenjac, boja, snaga, zapremina, kilometraza, opis, opremaIds, } = req.body;
        if (!req.files || !(req.files instanceof Array)) {
            return res.status(400).json({ message: "Images are required" });
        }
        const images = await Promise.all(req.files.map((file, i) => (0, exports.processAndUploadImage)(file, i === 0)));
        let opremaData;
        if (opremaIds && Array.isArray(opremaIds)) {
            opremaData = {
                create: opremaIds.map((id) => ({
                    oprema: { connect: { id: Number(id) } },
                })),
            };
        }
        const car = await prisma_1.default.car.create({
            data: {
                brendId: Number(brendId),
                model,
                godina: Number(godina),
                cijena: Number(cijena),
                oblikKaroserije,
                gorivo,
                mjenjac,
                boja,
                snaga: Number(snaga),
                zapremina: Number(zapremina),
                kilometraza: Number(kilometraza),
                opis,
                oprema: opremaData,
                slike: { create: images },
            },
            include: {
                slike: true,
                brend: true,
                oprema: { include: { oprema: true } },
            },
        });
        res.status(201).json(car);
    }
    catch (error) {
        console.error("Create car error:", error);
        return res.status(500).json({ message: "Failed to create car" });
    }
};
exports.createCar = createCar;
const updateCar = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const payload = req.body;
        let data = {
            brandId: payload.brandId ? Number(payload.brandId) : undefined,
            model: payload.model,
            godina: payload.godina ? Number(payload.godina) : undefined,
            cijena: payload.cijena ? Number(payload.cijena) : undefined,
            oblikKaroserije: payload.oblikKaroserije,
            gorivo: payload.gorivo,
            mjenjac: payload.mjenjac,
            boja: payload.boja,
            snaga: payload.snaga ? Number(payload.snaga) : undefined,
            zapremina: payload.zapremina ? Number(payload.zapremina) : undefined,
            kilometraza: payload.kilometraza
                ? Number(payload.kilometraza)
                : undefined,
            opis: payload.opis,
        };
        if (req.files && req.files instanceof Array && req.files.length > 0) {
            const newImages = await Promise.all(req.files.map((file, i) => (0, exports.processAndUploadImage)(file, i === 0)));
            data.slike = { create: newImages };
        }
        if (payload.opremaIds && Array.isArray(payload.opremaIds)) {
            data.oprema = {
                set: payload.opremaIds.map((opremaId) => ({
                    opremaId: Number(opremaId),
                })),
            };
        }
        const car = await prisma_1.default.car.update({
            where: { id },
            data,
            include: {
                slike: true,
                brend: true,
                oprema: { include: { oprema: true } },
            },
        });
        res.json(car);
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to update car" });
    }
};
exports.updateCar = updateCar;
const deleteCar = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const car = await prisma_1.default.car.findUnique({
            where: { id },
            include: { slike: true },
        });
        if (!car)
            return res.status(404).json({ message: "Car not found" });
        for (const img of car.slike) {
            const urls = [img.url, img.mediumUrl, img.thumbUrl];
            for (const val of urls) {
                if (!val)
                    continue;
                let key = val;
                // If value looks like a full URL, extract the key part after the bucket domain
                if (/^https?:\/\//i.test(val)) {
                    const idx = val.indexOf(".net/");
                    key = idx !== -1 ? val.substring(idx + 5) : val;
                }
                await (0, wasabi_1.deleteFromWasabi)(key);
            }
        }
        await prisma_1.default.carImage.deleteMany({ where: { carId: id } });
        await prisma_1.default.autoOprema.deleteMany({ where: { carId: id } });
        await prisma_1.default.car.delete({ where: { id } });
        res.json({ message: "Car deleted" });
    }
    catch (error) {
        console.error("Delete car error:", error);
        return res.status(500).json({ message: "Failed to delete car" });
    }
};
exports.deleteCar = deleteCar;
const incrementCarViews = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const updateCar = await prisma_1.default.car.update({
            where: { id },
            data: { pregledi: { increment: 1 } },
            select: { pregledi: true },
        });
        res.json(updateCar);
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to increment views" });
    }
};
exports.incrementCarViews = incrementCarViews;
