const TaxStatusBadge = ({ status }) => {
  const color = {
    Active: "#d4f4dd",
    Inactive: "#fde2e1",
  };

  const textColor = {
    Active: "#276749",
    Inactive: "#c53030",
  };

  return (
    <span
      className="tax-status-badge"
      style={{
        backgroundColor: color[status],
        color: textColor[status],
      }}
    >
      {status}
    </span>
  );
};

export default TaxStatusBadge;
