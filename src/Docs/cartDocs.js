/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management APIs
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Create a new cart for the logged-in user
 *     tags: [Cart]
 *     responses:
 *       201:
 *         description: Cart created successfully
 *       400:
 *         description: userId is required
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the active cart for the logged-in user
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Active cart returned
 *       400:
 *         description: userId is required
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64f123abc456def789012345
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item added to cart
 *       400:
 *         description: Missing productId or invalid stock
 */

/**
 * @swagger
 * /cart:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64f123abc456def789012345
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       400:
 *         description: userId or productId missing
 *       404:
 *         description: Item not in cart
 */

/**
 * @swagger
 * /cart/{productId}:
 *   delete:
 *     summary: Delete an item from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID to remove
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       404:
 *         description: Item not found in cart
 */

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Clear the cart for the logged-in user
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       404:
 *         description: Active cart not found
 */

/**
 * @swagger
 * /cart/checkout:
 *   post:
 *     summary: Checkout the active cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shippingAddress
 *               - paymentMethod
 *             properties:
 *               shippingAddress:
 *                 type: string
 *                 example: "123 Main Street, Cairo, Egypt"
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, credit, paypal]
 *                 example: cash
 *     responses:
 *       201:
 *         description: Checkout successful
 *       400:
 *         description: Missing fields or empty cart
 */
