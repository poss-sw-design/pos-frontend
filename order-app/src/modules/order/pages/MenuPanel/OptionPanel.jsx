import React, { useState, useMemo } from "react";

const OptionPanel = ({ item, onCancel, onAdd }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Medium");
  const [sugar, setSugar] = useState("None");
  const [extras, setExtras] = useState([]);

  const extrasList = [
    { name: "Whipped Cream", price: 0.5 },
    { name: "Chocolate Syrup", price: 0.75 },
    { name: "Caramel Drizzle", price: 0.75 }
  ];

  // EXTRA PRICE 계산
  const extraTotal = useMemo(() => {
    return extrasList
      .filter(e => extras.includes(e.name))
      .reduce((sum, e) => sum + e.price, 0);
  }, [extras]);

  // FINAL PRICE 계산
  const finalPrice = useMemo(() => {
    return (item.price + extraTotal) * quantity;
  }, [item.price, extraTotal, quantity]);

  const toggleExtra = (extra) => {
    setExtras(prev =>
      prev.includes(extra)
        ? prev.filter(e => e !== extra)
        : [...prev, extra]
    );
  };

  return (
    <div className="option-panel">

      {/* ITEM HEADER */}
      <div className="option-header">
        <div className="option-img"></div>

        <h2>{item.name}</h2>
        <p className="option-desc">{item.description || ""}</p>

        <div className="option-price">${item.price.toFixed(2)}</div>

        <div className="qty-box">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div>

      {/* SIZE SECTION */}
      <h3 className="opt-title">Size</h3>
      <div className="size-options">
        {["Small", "Medium", "Large"].map((s) => (
          <div
            key={s}
            className={`size-card ${size === s ? "active" : ""}`}
            onClick={() => setSize(s)}
          >
            <div className="size-img"></div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      {/* SUGAR SECTION */}
      <h3 className="opt-title">Sugar</h3>
      <div className="sugar-options">
        {["None", "Low", "Medium", "High"].map((level) => (
          <button
            key={level}
            className={`sugar-btn ${sugar === level ? "active" : ""}`}
            onClick={() => setSugar(level)}
          >
            {level}
          </button>
        ))}
      </div>

      {/* EXTRAS SECTION */}
      <h3 className="opt-title">Extras</h3>
      <div className="extras-list">
        {extrasList.map((ext) => (
          <div
            key={ext.name}
            className={`extra-item ${extras.includes(ext.name) ? "active" : ""}`}
            onClick={() => toggleExtra(ext.name)}
          >
            <div className="extra-img"></div>
            <span>{ext.name}</span>
            <span className="extra-price">${ext.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* ORDER SUMMARY MINI SECTION */}
      <div className="option-summary-box">
        <h4>Order Summary</h4>
        <div className="summary-line">
          {item.name} ({size})
        </div>

        {extras.map(ex => (
          <div key={ex} className="summary-line">
            + {ex}
          </div>
        ))}

        {/* 🔥 FIXED: 가격이 옵션 변경 시 즉시 업데이트됨 */}
        <div className="summary-total">Total: ${finalPrice.toFixed(2)}</div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="option-actions">
        <button className="cancel-btn" onClick={onCancel}>Cancel</button>

        <button
          className="add-btn"
          onClick={() =>
            onAdd({
              id: item.id,
              name: item.name,
              size,
              sugar,
              extras,
              quantity,
              basePrice: item.price,
              extraPrice: extraTotal,
              totalPrice: finalPrice
            })
          }
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
};

export default OptionPanel;
