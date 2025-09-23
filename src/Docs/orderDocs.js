/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: User order management APIs
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders for the logged-in user
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of user orders (most recent first)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 64f123abc456def789012345
 *                   userId:
 *                     type: string
 *                     example: 64f123abc456def789012111
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         product:
 *                           type: string
 *                           example: 64f123abc456def789099999
 *                         title:
 *                           type: string
 *                           example: Wireless Mouse
 *                         image:
 *                           type: string
 *                           example: https://picsum.photos/seed/mouse/600/400
 *                         quantity:
 *                           type: integer
 *                           example: 2
 *                         unitPrice:
 *                           type: number
 *                           example: 25.99
 *                         subtotal:
 *                           type: number
 *                           example: 51.98
 *                   totalAmount:
 *                     type: number
 *                     example: 120.50
 *                   shippingAddress:
 *                     type: string
 *                     example: "123 Main Street, Cairo, Egypt"
 *                   paymentMethod:
 *                     type: string
 *                     example: cash
 *                   status:
 *                     type: string
 *                     example: pending
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-09-22T10:00:00.000Z
 */
