// PCBuilder.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ConfigurationService from "../services/ConfigurationService";
import type { Configuration, Product } from "../services/ConfigurationService";
import "./PCBuilder.css";

const decodeJWT = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
};

type ComponentRow = {
  component: string;
  product: Product | null;
};

const initialComponents: ComponentRow[] = [
  "CPU",
  "Motherboard",
  "Case",
  "GPU",
  "RAM",
  "Hard drive",
  "Cooler",
  "Power Supply",
].map((name) => ({ component: name, product: null }));

const PCBuilder: React.FC = () => {
  const token = localStorage.getItem("token") || "";
  const user = decodeJWT(token);
  const userID = user?.sub ? Number(user.sub) : null;

  const [configID, setConfigID] = useState<number | null>(null);
  const [components, setComponents] = useState<ComponentRow[]>(initialComponents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newConfigName, setNewConfigName] = useState("");
  const [configurations, setConfigurations] = useState<Configuration[]>([]);
  const [selectedConfigID, setSelectedConfigID] = useState<string>("");

  useEffect(() => {
    const loadConfigurations = async () => {
      try {
        if (userID) {
          const data = await ConfigurationService.getByUser(userID);
          setConfigurations(data);
        }
      } catch (err) {
        console.error("Error loading configurations:", err);
      }
    };
    loadConfigurations();
  }, [userID]);

  const handleCreateConfig = async () => {
    try {
      if (!userID || isNaN(userID)) throw new Error("User ID not found or invalid");

      const res = await ConfigurationService.create(userID, newConfigName);
      setConfigID(res.configID);
      setDialogOpen(false);
      setNewConfigName("");

      const updatedConfigs = await ConfigurationService.getByUser(userID);
      setConfigurations(updatedConfigs);
    } catch (err) {
      console.error("Error creating configuration:", err);
    }
  };

  const handleAddComponent = (index: number) => {
    alert("Add component functionality to be implemented.");
  };

  const handleRemove = (index: number) => {
    setComponents((prev) => {
      const updated = [...prev];
      updated[index].product = null;
      return updated;
    });
  };

  const handleSelectConfig = async (event: SelectChangeEvent<string>) => {
    const selectedID = event.target.value;
    setSelectedConfigID(selectedID);
    const selectedConfigIDNum = Number(selectedID);
    setConfigID(selectedConfigIDNum);

    try {
      const selectedConfig = configurations.find(cfg => cfg.id === selectedConfigIDNum);

      if (selectedConfig && Array.isArray(selectedConfig.products)) {
        const updatedComponents = initialComponents.map((comp) => {
          const productForComponent = selectedConfig.products.find(prod =>
            prod.category?.toLowerCase() === comp.component.toLowerCase()
          );
          return {
            ...comp,
            product: productForComponent || null,
          };
        });

        setComponents(updatedComponents);
      } else {
        setComponents(initialComponents.map(c => ({ ...c, product: null })));
      }
    } catch (error) {
      console.error("Error fetching products for config:", error);
      setComponents(initialComponents.map(c => ({ ...c, product: null })));
    }
  };

  const getTotalPrice = () =>
    components.reduce((sum, row) => sum + (row.product?.price || 0), 0);

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("PC Configuration", 14, 15);

    const head = [["Component", "Product", "Store", "Price"]];
    const body = components.map((row) => [
      row.component,
      row.product ? row.product.title : "-",
      row.product?.store || "-", 
      row.product ? `${row.product.price}` : "-",
    ]);

    const totalPrice = getTotalPrice();

    body.push(["", "", "Total", `${totalPrice} den`]);

    autoTable(doc, {
      head,
      body,
      startY: 20,
      theme: "striped",
    });

    doc.save("configuration.pdf");
  };

  return (
    <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center">
      <Box textAlign="center" mb={2} display="flex" gap={2} alignItems="center">
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          Create New Configuration
        </Button>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Select Configuration</InputLabel>
          <Select
            value={selectedConfigID}
            label="Select Configuration"
            onChange={handleSelectConfig}
          >
            {configurations.map((cfg) => (
              <MenuItem key={cfg.id} value={cfg.id.toString()}>
                {cfg.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={handleExportPDF}>
          Export PDF
        </Button>
      </Box>

      <TableContainer className="pc-builder-container">
        <Paper className="pc-builder-paper">
          <Table className="pc-builder-table">
            <TableHead>
              <TableRow className="pc-builder-header-row">
                <TableCell>Component</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Store</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {components.map((row, index) => (
                <TableRow key={index} className="pc-builder-tr" hover>
                  <TableCell>{row.component}</TableCell>
                  <TableCell>
                    {row.product ? (
                      row.product.title
                    ) : (
                      <Button
                        onClick={() => handleAddComponent(index)}
                        variant="contained"
                        size="small"
                      >
                        + ADD Component
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{row.product?.store || "-"}</TableCell>
                  <TableCell>{row.product ? `${row.product.price} ден` : "-"}</TableCell>
                  <TableCell>
                    {row.product && (
                      <Button
                        onClick={() => handleRemove(index)}
                        color="error"
                        size="small"
                      >
                        Remove
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <strong>Total:</strong>
                </TableCell>
                <TableCell colSpan={2}>
                  <strong>{getTotalPrice()} ден</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Create New Configuration</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Configuration Name"
            value={newConfigName}
            onChange={(e) => setNewConfigName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateConfig}
            disabled={!newConfigName.trim()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PCBuilder;
