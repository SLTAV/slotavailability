import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import { ChevronDown, Heart, X } from 'lucide-react';
const currencies = [
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', color: '#f7931a' },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', color: '#8794cf' },
  { code: 'USDC', name: 'USD Coin', symbol: '$', color: '#2775ca' },
  { code: 'USDT', name: 'Tether', symbol: '₮', color: '#26a17b' },
];
export function DonationWallet() {
  const [selected, setSelected] = useState(currencies[0]);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const coin = (item: typeof selected) => (
    <span className="donation-coin" style={{ background: item.color }} aria-hidden="true">
      {item.symbol}
    </span>
  );
  return (
    <>
      <div className="donation-wallet">
        <button
          className="donation-currency"
          aria-label="Choose donation currency"
          aria-haspopup="menu"
          aria-expanded={Boolean(anchor)}
          onClick={(e) => {
            setAnchor(e.currentTarget);
            setQuery('');
          }}
        >
          {coin(selected)}
          <span>{selected.code}</span>
          <ChevronDown size={15} />
        </button>
        <button
          className="donation-trigger"
          aria-label="Feeling generous? Support the database"
          onClick={() => setOpen(true)}
        >
          <Heart size={16} />
          <span>Feeling generous?</span>
        </button>
      </div>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        slotProps={{ paper: { className: 'donation-menu' } }}
      >
        <div className="donation-menu-search" onKeyDown={(e) => e.stopPropagation()}>
          <TextField
            autoFocus
            size="small"
            placeholder="Search currencies"
            slotProps={{ htmlInput: { 'aria-label': 'Search currencies' } }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {currencies
          .filter((item) =>
            (item.code + ' ' + item.name).toLowerCase().includes(query.toLowerCase()),
          )
          .map((item) => (
            <MenuItem
              key={item.code}
              selected={selected.code === item.code}
              onClick={() => {
                setSelected(item);
                setAnchor(null);
              }}
            >
              {coin(item)}
              <span>{item.name}</span>
              <strong>{item.code}</strong>
            </MenuItem>
          ))}
        {!currencies.some((item) =>
          (item.code + ' ' + item.name).toLowerCase().includes(query.toLowerCase()),
        ) && <li className="donation-empty">No matching currency</li>}
        <li className="donation-menu-note">Support the database</li>
      </Menu>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
        aria-labelledby="donation-title"
        slotProps={{ paper: { className: 'donation-dialog' } }}
      >
        <DialogTitle id="donation-title">
          Feeling generous?
          <IconButton aria-label="Close donation window" onClick={() => setOpen(false)}>
            <X size={19} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <p>
            A little support helps us keep exploring, improving and sharing information. Thank you
            for considering a donation.
          </p>
          <div className="donation-options">
            {currencies.map((item) => (
              <button
                key={item.code}
                aria-pressed={selected.code === item.code}
                onClick={() => setSelected(item)}
              >
                {coin(item)}
                {item.code}
              </button>
            ))}
          </div>
          <div className="donation-address">
            <strong>{selected.name} donations</strong>
            <span>Wallet not configured yet</span>
            <p>
              The receiving address and exact network will appear here once donations are enabled.
            </p>
          </div>
          <Button fullWidth variant="outlined" disabled>
            Copy address
          </Button>
          <p className="donation-preview-note">Preview only · Donations are not enabled yet.</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
