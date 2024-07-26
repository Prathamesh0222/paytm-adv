import express from "express";
import db from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation: {
        token: string,
        userId: number,
        amount: number
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: paymentInformation.userId
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success",
                }
            })
        ])
        res.json({
            message: "Captured"
        })
    } catch (e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(3000, () => {
    console.log("Server started at 3000");
});