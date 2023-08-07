import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

router.post("/identify", async (req: Request, res: Response) => {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
        return res.status(400).json({ error: "Either email or phoneNumber must be provided." });
    }

    try {
        const primaryContact = await prisma.contact.findFirst({
            where: {
                OR: [{ email }, { phoneNumber }],
                linkPrecedence: "primary",
            },
        });

        if (!primaryContact) {
            const newPrimaryContact = await prisma.contact.create({
                data: {
                    email,
                    phoneNumber,
                    linkPrecedence: "primary",
                },
            });

            return res.status(200).json({
                contact: {
                    primaryContatctId: newPrimaryContact.id,
                    emails: [newPrimaryContact.email],
                    phoneNumbers: [newPrimaryContact.phoneNumber],
                    secondaryContactIds: [],
                },
            });
        }

        const secondaryContacts = await prisma.contact.findMany({
            where: {
                linkedId: primaryContact.id,
                linkPrecedence: "secondary",
            },
        });

        return res.status(200).json({
            contact: {
                primaryContatctId: primaryContact.id,
                emails: [primaryContact.email, ...secondaryContacts.map((contact) => contact.email)],
                phoneNumbers: [primaryContact.phoneNumber, ...secondaryContacts.map((contact) => contact.phoneNumber)],
                secondaryContactIds: secondaryContacts.map((contact) => contact.id),
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
