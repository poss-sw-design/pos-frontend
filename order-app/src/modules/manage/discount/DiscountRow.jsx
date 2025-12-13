import React from "react";
import { Pencil, Trash } from "lucide-react";
import DiscountStatusBadge from "./DiscountStatusBadge";

const DiscountRow = ({ discount, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{discount.name}</td>
      <td>{discount.scope}</td>
      <td>
        {discount.type === "percent"
          ? `${discount.value}%`
          : `$${discount.value}`}
      </td>
      <td>{discount.minPrice ? `$${discount.minPrice}` : "-"}</td>
      <td>{discount.expires || "-"}</td>
      <td>{discount.maxUses || "-"}</td>
      <td>
        <DiscountStatusBadge status={discount.status} />
      </td>

      <td className="actions">
        <button className="icon-btn" onClick={() => onEdit(discount)}>
          <Pencil size={18} />
        </button>

        <button className="icon-btn" onClick={() => onDelete(discount.id)}>
          <Trash size={18} color="red" />
        </button>
      </td>
    </tr>
  );
};

export default DiscountRow;
