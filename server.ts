import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Memory store for demo purposes (replace with DB later)
  const companies: any[] = [
    { id: 'STP-8829', name: 'StockPilot Ventures Group', status: 'ACTIVE', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmf5cu6cxt1mDgGIfH24yITb4yiTM2lyokRlkrCXjFHPrnBgqsRWwRz-DGCiAeCqApU0yTGWfFuXdVL1cxjOQqa1HOohBuzbDKJfy5N95gNUoD3lvi9xPAPJPk__sb5U-VMvjqS4fN8y2Wqn4tdSqGGXDCQTjWm-_bpvxw7VypdpHjZMDueyADmSCtwfGoS-G5tdNKLlB-8BhFcIYmiSgxmvFwmD8JH34tTOtYzXUk6nHOV31fHHBlRiU8m4BMIS45W80Hea6a18A', address: 'San Francisco, CA', createdAt: '2022-02-15T00:00:00Z' },
    { id: 'QD-1044', name: 'Quantum Dynamics', status: 'ACTIVE', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9GJ79jaV8j3WRh65GT84olJKEybHnMBPXi6dQyYoyWwP4u-wzdqW27ttTialX0-sq-QoC5kaBecAqSzQjXGJ9yym2zWSJpLz7z5961gVUFAtMuwmDD4q4lEJ3UjW8PE3b2WJpnVbA2VJaz37Sw3hBIdZDzU2Q4JzvZYn6i1Qhpm9TqndWwJxtuCQz20CtzKcvYO-A4EjjPwNMwRDSIr08SX1gTfH1lqECuToNxF9hh8UeNP34MSMzIyB4T_uhOqDjJsH4aTe8iB0', address: 'Austin, TX', createdAt: '2022-05-20T00:00:00Z' }
  ];
  const branches: any[] = [
    { id: 'BRH-001', name: 'Main Office', location: 'New York, NY', manager: 'Marcus Thompson', companyId: 'STP-8829', headcount: 120, compliance: 100 },
    { id: 'BRH-002', name: 'North Hub', location: 'Chicago, IL', manager: 'Elena Rodriguez', companyId: 'STP-8829', headcount: 45, compliance: 95 }
  ];
  const users: any[] = [
    { id: 'USR-001', name: 'Marcus Thompson', email: 'm.thompson@stockpilot.co', role: 'Manager', roleId: 'da976e55-be3b-44e6-bb00-7a2f7d6ec514', branches: ['Main Office', 'North Hub'], branchIds: ['BRH-001', 'BRH-002'], status: 'Active', phone: '+1 (555) 123-4567', img: 'https://i.pravatar.cc/150?u=USR-001' },
    { id: 'USR-002', name: 'Elena Rodriguez', email: 'e.rodriguez@stockpilot.co', role: 'Staff', roleId: 'da976e55-be3b-44e6-bb00-7a2f7d6ec515', branches: ['Main Office'], branchIds: ['BRH-001'], status: 'Active', phone: '+1 (555) 234-5678', img: 'https://i.pravatar.cc/150?u=USR-002' }
  ];
  const products: any[] = [];
  const stocks: any[] = [];
  const stockTransactions: any[] = [];
  const roles: any[] = [
    { id: 'da976e55-be3b-44e6-bb00-7a2f7d6ec514', name: 'Manager' },
    { id: 'da976e55-be3b-44e6-bb00-7a2f7d6ec515', name: 'Staff' },
    { id: 'da976e55-be3b-44e6-bb00-7a2f7d6ec516', name: 'Admin' }
  ];

  // API Routes
  app.post("/api/company/company", (req, res) => {
    const { name, address, logo } = req.body;
    if (!name || !address) {
      return res.status(400).json({ error: "Name and address are required" });
    }
    const newCompany = {
      id: `COMP-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      address,
      logo: logo || "https://placeholder.com/150",
      status: "ACTIVE",
      createdAt: new Date().toISOString()
    };
    companies.push(newCompany);
    console.log("Company created:", newCompany);
    res.status(201).json(newCompany);
  });

  app.get("/api/company/companies", (req, res) => {
    res.json(companies);
  });

  // Branch Routes
  app.post("/api/branch/branches", (req, res) => {
    const { name, manager, address, location, companyId } = req.body;
    if (!name || !companyId) {
      return res.status(400).json({ error: "Name and companyId are required" });
    }
    const newBranch = {
      id: `BRH-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      manager: manager || "Unassigned",
      location: address || location || "Remote",
      address: address || location || "",
      companyId,
      headcount: 0,
      compliance: 100,
      createdAt: new Date().toISOString()
    };
    branches.push(newBranch);
    console.log("Branch created:", newBranch);
    res.status(201).json(newBranch);
  });

  app.get("/api/branch/branches/:companyId", (req, res) => {
    const { companyId } = req.params;
    const companyBranches = branches.filter(b => b.companyId === companyId);
    res.json(companyBranches);
  });

  app.get("/api/branch/all", (req, res) => {
    res.json(branches);
  });

  app.put("/api/branch/branches/:id", (req, res) => {
    const { id } = req.params;
    const index = branches.findIndex(b => b.id === id);
    if (index !== -1) {
      branches[index] = { ...branches[index], ...req.body };
      res.json(branches[index]);
    } else {
      res.status(404).json({ error: "Branch not found" });
    }
  });

  app.delete("/api/branch/branches/:id", (req, res) => {
    const { id } = req.params;
    const index = branches.findIndex(b => b.id === id);
    if (index !== -1) {
      branches.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Branch not found" });
    }
  });

  // User/Staff Routes
  app.post("/api/user/register", (req, res) => {
    const { fullName, email, password, roleId, branchIds } = req.body;
    if (!fullName || !email || !roleId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    const role = roles.find(r => r.id === roleId);
    const selectedBranches = branches.filter(b => branchIds.includes(b.id));

    const newUser = {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: fullName,
      email,
      role: role ? role.name : 'Unknown',
      roleId,
      branches: selectedBranches.map(b => b.name),
      branchIds,
      status: 'Active',
      createdAt: new Date().toISOString(),
      img: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.get("/api/user/users", (req, res) => {
    res.json(users);
  });

  // Product Routes
  app.post("/api/product/create-product", (req, res) => {
    const { name, description, price, sku, category, unit } = req.body;
    if (!name || !price || !sku) {
      return res.status(400).json({ error: "Name, price, and SKU are required" });
    }

    const newProduct = {
      id: `PRD-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      description: description || "",
      price,
      sku,
      category: category || "Uncategorized",
      unit: unit || "pcs",
      stock: 0,
      status: "Out of Stock",
      createdAt: new Date().toISOString(),
      img: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
  });

  app.get("/api/product/products", (req, res) => {
    res.json(products);
  });

  app.get("/api/product/product/:id", (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });

  // Stock Routes
  app.post("/api/stock/add-stock", (req, res) => {
    const { productId, quantity, branchId, threshold, description } = req.body;
    if (!productId || !quantity || !branchId) {
      return res.status(400).json({ error: "Product ID, quantity, and branch ID are required" });
    }

    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update product overall stock
    products[productIndex].stock += quantity;
    products[productIndex].status = products[productIndex].stock > (threshold || 5) ? "In Stock" : "Low Stock";

    const newStockEntry = {
      id: `STK-${Math.floor(1000 + Math.random() * 9000)}`,
      productId,
      quantity,
      branchId,
      threshold: threshold || 5,
      description: description || "Stock update",
      createdAt: new Date().toISOString()
    };

    stocks.push(newStockEntry);

    // Recording transaction
    stockTransactions.push({
      id: `TRX-${Math.floor(1000 + Math.random() * 9000)}`,
      stockId: newStockEntry.id,
      productId,
      branchId,
      type: 'RESTOCK',
      amount: quantity,
      timestamp: new Date().toISOString(),
      note: description
    });

    res.status(201).json(newStockEntry);
  });

  app.get("/api/stock/stocks", (req, res) => {
    res.json(stocks);
  });

  app.get("/api/stock/stock-transactions/:stockId", (req, res) => {
    const transactions = stockTransactions.filter(t => t.stockId === req.params.stockId);
    res.json(transactions);
  });

  // RBAC Routes
  app.get("/api/rbac/roles", (req, res) => {
    res.json(roles);
  });

  app.post("/api/rbac/roles", (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Role name is required" });
    }

    const newRole = {
      id: `ROL-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      createdAt: new Date().toISOString()
    };

    roles.push(newRole);
    res.status(201).json(newRole);
  });

  app.get("/api/rbac/roles-with-permissions", (req, res) => {
    // For now, just return roles. Can be expanded later.
    res.json(roles.map(r => ({ ...r, permissions: [] })));
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
