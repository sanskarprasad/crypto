// src/components/CryptoTable.js
import React from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart, Line, ResponsiveContainer
} from 'recharts';
import {
  SiBitcoin, SiEthereum, SiTether, SiRipple, SiSolana
} from 'react-icons/si';

const ICONS = {
  btc: SiBitcoin,
  eth: SiEthereum,
  usdt: SiTether,
  xrp: SiRipple,
  sol: SiSolana,
};

export default function CryptoTable() {
  const assets = useSelector(state => state.crypto.assets);

  const fmt = num =>
    num >= 1e12
      ? `${+(num / 1e12).toFixed(2)}T`
      : num >= 1e9
      ? `${+(num / 1e9).toFixed(2)}B`
      : num >= 1e6
      ? `${+(num / 1e6).toFixed(2)}M`
      : num >= 1e3
      ? `${+(num / 1e3).toFixed(2)}K`
      : num;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {[
              '#','Name','Price','1h %','24h %','7d %',
              'Market Cap','24h Volume','Circulating','Max','7D Chart'
            ].map(h => (
              <th key={h} style={{ textAlign:'left', padding:'8px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {assets.map((a,i) => {
            const Icon = ICONS[a.id];
            const pctColor = v => ({ color: v >= 0 ? 'green' : 'red' });
            return (
              <tr key={a.id}>
                <td style={{ padding:'8px' }}>{i+1}</td>
                <td style={{ display:'flex', alignItems:'center', padding:'8px' }}>
                  {Icon && <Icon size={24} style={{ marginRight:8 }} />}
                  <div>
                    <div>{a.name}</div>
                    <small>{a.symbol}</small>
                  </div>
                </td>
                <td style={{ padding:'8px' }}>${a.price.toLocaleString()}</td>
                <td style={{ padding:'8px', ...pctColor(a.percentChange1h) }}>
                  {a.percentChange1h.toFixed(2)}%
                </td>
                <td style={{ padding:'8px', ...pctColor(a.percentChange24h) }}>
                  {a.percentChange24h.toFixed(2)}%
                </td>
                <td style={{ padding:'8px', ...pctColor(a.percentChange7d) }}>
                  {a.percentChange7d.toFixed(2)}%
                </td>
                <td style={{ padding:'8px' }}>${fmt(a.marketCap)}</td>
                <td style={{ padding:'8px' }}>${fmt(a.volume24h)}</td>
                <td style={{ padding:'8px' }}>{fmt(a.circulatingSupply)}</td>
                <td style={{ padding:'8px' }}>
                  {a.maxSupply !== null ? fmt(a.maxSupply) : '—'}
                </td>
                <td style={{ width:120, height:50 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={a.chartData7d.map((v, idx) => ({ idx, v }))}>
                      <Line
                        type="monotone"
                        dataKey="v"
                        dot={false}
                        stroke={a.chartData7d[a.chartData7d.length-1] >= a.chartData7d[0] ? 'green' : 'red'}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
