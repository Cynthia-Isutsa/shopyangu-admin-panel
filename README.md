# Setup instructions to run the app locally
1. clone the shopyangu-admin-panel repo shared
2. Run npm install or yarn install to install all the required dependencies
3. Incase your react version or node version are not compatible use --legacy-peer-deps
4.  Run npm run dev to run the frontend on localhost:3000
5. Run npm run serve-json to run the backend on localhost:5000

# A description of the platform and its features
- This is an admin panel for ShopYangu , a growing e-commerce platform that manages shops and products.
- The platform enables the admin to create and manage shops, associating products with these shops, and ensuring that product details like price, stock 
levels, and descriptions are up to date
- When the project loads, the user is presented with a dashboard, shop management and product management tabs on the side bar
- The dashboard provides an overview of the shops and products available on the platform.
- The shop management tab enables the user to create, edit, and delete shops.
- The product management gives the user a summary of all shops available on the platform through the use of cards. On clicking view products button the user goes to a page that allows them to create, edit, and delete products, associated with that specific shop.

# Instructions for testing the admin panel and its features.
1. Run the Application

Ensure both the frontend (npm run dev) and backend (npm run serve-json) are running on their respective ports:
Frontend: http://localhost:3000
Backend: http://localhost:5000

2. Access the Dashboard

Navigate to http://localhost:3000 in your browser.
Verify that the dashboard loads correctly and displays an overview of the shops and products, including key metrics like total stock levels, price ranges, and low-stock products.
 
 3. Test Shop Management

Go to the "Shop Management" tab in the sidebar.
Create a Shop:
Click the "Add Shop" button.
Fill in the required fields (e.g., shop name, location) and submit.
Verify that the new shop appears in the shop list by refreshing the page.
Edit a Shop:
Select a shop from the list and click the "Edit" , "pencil" button.
Modify details and save changes.
Confirm that the updates are reflected in the shop list.
Delete a Shop:
Select a shop and click the "Delete" button.
Confirm the action and ensure the shop is removed from the list.
4. Test Product Management

Navigate to the "Product Management" tab.
View Products by Shop:
Click on a shop card to view the products associated with that shop.
Create a Product:
Click "Add Product," fill in details (e.g., name, price, stock level), and submit.
Verify that the product is added to the shop’s product list by refreshing the page.
Edit a Product:
Select a product from the list and click "Edit."
Update the product details and save.
Confirm that the changes are displayed in the list.
Delete a Product:
Click "Delete" on a product in the list.
Confirm the action and verify that the product is removed.

5. Open the Dashboard and notice the realtime updates


