import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../ui/Modal";
import ActionButton from "../../ui/ActionButton";
import Input from "../../ui/Input";
import Table from "../../ui/Table";

const FlatSale = () => {
  const [sales, setSales] = useState([
    { id: 1, name: "Summer Sale", discount: 20, startDate: "2023-07-01", endDate: "2023-07-31", active: true },
    { id: 2, name: "Winter Bonanza", discount: 15, startDate: "2023-12-01", endDate: "2023-12-31", active: false },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newSale, setNewSale] = useState({
    name: "",
    discount: "",
    startDate: "",
    endDate: "",
  });

  const handleAddSale = () => {
    setSales([
      ...sales,
      {
        ...newSale,
        id: sales.length + 1,
        active: false,
      },
    ]);
    setNewSale({ name: "", discount: "", startDate: "", endDate: "" });
    setShowModal(false);
  };

  const toggleActive = (id) => {
    setSales(sales.map((sale) => (sale.id === id ? { ...sale, active: !sale.active } : sale)));
  };

  const deleteSale = (id) => {
    setSales(sales.filter((sale) => sale.id !== id));
  };

  const columns = [
    { key: "name", label: "Sale Name" },
    { key: "discount", label: "Discount (%)" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
    { key: "active", label: "Active" },
  ];

  const handleToggleStatus = (id) => toggleActive(id);
  const handleDelete = (id) => deleteSale(id);

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800"></h1>
        <ActionButton
          onClick={() => setShowModal(true)}
          text="Add Flat Sale"
        >
          Add Sale <FontAwesomeIcon icon={faPlus} className="ml-2" />
        </ActionButton>
      </header>

      <Table
        columns={columns}
        data={sales}
        handleEdit={(item) => console.log("Edit Sale:", item)}
        handleDelete={handleDelete}
        handleToggleStatus={handleToggleStatus}
        identifierKey="id"
      />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 className="text-2xl font-bold mb-6">Add Flat Sale</h2>
          <div className="space-y-4">
            <Input
              label="Sale Name"
              value={newSale.name}
              onChange={(e) => setNewSale({ ...newSale, name: e.target.value })}
            />
            <Input
              label="Discount (%)"
              type="number"
              value={newSale.discount}
              onChange={(e) => setNewSale({ ...newSale, discount: e.target.value })}
            />
            <Input
              label="Start Date"
              type="date"
              value={newSale.startDate}
              onChange={(e) => setNewSale({ ...newSale, startDate: e.target.value })}
            />
            <Input
              label="End Date"
              type="date"
              value={newSale.endDate}
              onChange={(e) => setNewSale({ ...newSale, endDate: e.target.value })}
            />
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAddSale}
              className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primaryHover transition"
            >
              Add Sale
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FlatSale;
