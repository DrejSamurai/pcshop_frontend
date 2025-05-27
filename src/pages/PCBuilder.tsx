import React, { useState } from "react";
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
} from "@mui/material";
import ConfigurationService from "../services/ConfigurationService";
import "./PCBuilder.css";

const decodeJWT = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
};

type Product = {
  id: number;
  name: string;
  price: number;
};

type ComponentRow = {
  component: string;
  product: Product | null;
};

const PCBuilder: React.FC = () => {
  const token = localStorage.getItem("token") || "";
  const user = decodeJWT(token);
  const userID = user?.sub;

  const [configID, setConfigID] = useState<number | null>(null);
  const [components, setComponents] = useState<ComponentRow[]>(
    [
      "Processor",
      "Motherboard",
      "Case",
      "Graphics Card",
      "RAM",
      "Storage",
      "Cooler",
      "Power Supply",
    ].map((name) => ({ component: name, product: null }))
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newConfigName, setNewConfigName] = useState("");

  const handleCreateConfig = async () => {
    try {
      if (!userID) throw new Error("User ID not found");

      const res = await ConfigurationService.create(userID, newConfigName);
      setConfigID(res.configID);
      setDialogOpen(false);
      setNewConfigName("");
    } catch (err) {
      console.error("Error creating configuration:", err);
    }
  };

  const handleAddComponent = (index: number) => {
  };

  const handleRemove = (index: number) => {
  };

  return (
    <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center">
      <Box textAlign="center" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          Create New Configuration
        </Button>
      </Box>

      <TableContainer className="pc-builder-container">
        <Paper className="pc-builder-paper">
          <Table className="pc-builder-table">
            <TableHead>
              <TableRow className="pc-builder-header-row">
                <TableCell>Component</TableCell>
                <TableCell>Product</TableCell>
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
                      row.product.name
                    ) : (
                      <Button onClick={() => handleAddComponent(index)} variant="contained" size="small">
                        + ADD Component
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{row.product ? `$${row.product.price.toFixed(2)}` : ""}</TableCell>
                  <TableCell>
                    {row.product && (
                      <Button onClick={() => handleRemove(index)} color="error" size="small">
                        Remove
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
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
          <Button variant="contained" onClick={handleCreateConfig} disabled={!newConfigName.trim()}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PCBuilder;