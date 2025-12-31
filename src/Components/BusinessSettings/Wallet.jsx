import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

export default function Wallet() {
  const [toast, setToast] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);

  const [balance, setBalance] = useState(12450);

  const [amount, setAmount] = useState("");

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "12 Sep 2024",
      type: "Credit",
      description: "Client payment – Wedding Album",
      amount: 8000,
      status: "Success",
    },
    {
      id: 2,
      date: "05 Sep 2024",
      type: "Debit",
      description: "Subscription Upgrade",
      amount: 1999,
      status: "Success",
    },
    {
      id: 3,
      date: "01 Sep 2024",
      type: "Debit",
      description: "Bank Withdrawal",
      amount: 3000,
      status: "Pending",
    },
  ]);

  // ADD MONEY
  const handleAddMoney = () => {
    if (!amount) return;

    setBalance(balance + Number(amount));
    setTransactions([
      {
        id: Date.now(),
        date: new Date().toDateString(),
        type: "Credit",
        description: "Wallet Top-up",
        amount: Number(amount),
        status: "Success",
      },
      ...transactions,
    ]);

    setAmount("");
    setOpenAdd(false);
    setToast(true);
  };

  //  WITHDRAW
  const handleWithdraw = () => {
    if (!amount || amount > balance) return;

    setBalance(balance - Number(amount));
    setTransactions([
      {
        id: Date.now(),
        date: new Date().toDateString(),
        type: "Debit",
        description: "Bank Withdrawal",
        amount: Number(amount),
        status: "Pending",
      },
      ...transactions,
    ]);

    setAmount("");
    setOpenWithdraw(false);
    setToast(true);
  };

  return (
    <Box>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Wallet
        </Typography>

        <Box>
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => setOpenWithdraw(true)}
          >
            Withdraw
          </Button>

          <Button
            variant="contained"
            onClick={() => setOpenAdd(true)}
          >
            Add Money
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* BALANCE CARD */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Available Balance
        </Typography>

        <Typography variant="h4" fontWeight="bold">
          ₹ {balance.toLocaleString()}
        </Typography>
      </Paper>

      {/* TRANSACTIONS */}
      <Paper sx={{ p: 3 }}>
        <Typography fontWeight="bold" mb={2}>
          Transaction History
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.date}</TableCell>
                <TableCell>{t.description}</TableCell>
                <TableCell>
                  <Chip
                    label={t.type}
                    color={t.type === "Credit" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>₹ {t.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={t.status}
                    color={
                      t.status === "Success"
                        ? "success"
                        : "warning"
                    }
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* ADD MONEY MODAL */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add Money</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddMoney}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* WITHDRAW MODAL */}
      <Dialog open={openWithdraw} onClose={() => setOpenWithdraw(false)}>
        <DialogTitle>Withdraw to Bank</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            helperText={`Available balance ₹${balance}`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWithdraw(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleWithdraw}>
            Withdraw
          </Button>
        </DialogActions>
      </Dialog>

      {/* SUCCESS TOAST */}
      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={() => setToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          Wallet updated successfully 
        </Alert>
      </Snackbar>
    </Box>
  );
}
