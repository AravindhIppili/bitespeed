import { Request, Response, Router } from "express";
import Contact from "../models/contact";
import Sequelize from "sequelize";
const router = Router();

router.post("/identify", async (req, res) => {
    const { email = "", phoneNumber = "" } = req.body;

    try {
        const primaryContact = await Contact.findOne({
            where: {
                [Sequelize.Op.or]: [{ email }, { phoneNumber }],
                linkPrecedence: "primary",
            },
        });

        if (!primaryContact) {
            // Create a new primary contact if not found
            const newPrimary = await Contact.create({
                phoneNumber,
                email,
                linkPrecedence: "primary",
            });

            return res.status(200).json({
                contact: {
                    primaryContactId: newPrimary.id,
                    emails: [newPrimary.email],
                    phoneNumbers: [newPrimary.phoneNumber],
                    secondaryContactIds: [],
                },
            });
        }

        // Create a new secondary contact
        const secondaryContact = await Contact.create({
            phoneNumber,
            email,
            linkedId: primaryContact.id,
            linkPrecedence: "secondary",
        });

        return res.status(200).json({
            contact: {
                primaryContactId: primaryContact.id,
                emails: [primaryContact.email, secondaryContact.email],
                phoneNumbers: [primaryContact.phoneNumber, secondaryContact.phoneNumber],
                secondaryContactIds: [secondaryContact.id],
            },
        });
    } catch (error) {
        console.error("Error identifying contact:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
