import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import type { Pizza } from "../types/Pizza";
import { Table } from "react-bootstrap";

const Cart = () => {
  const [pizzak, setPizzak] = useState<Array<Pizza>>([]);
  useEffect(() => {
    apiClient
      .get("/pizzak")
      .then((response) => setPizzak(response.data))
      .catch(() => toast.error("A pizzák betöltése sikertelen volt"));
  }, []);

  const [kosar, setKosar] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("kosar") ?? "[]")
  );

  return (
    <>
      <h1>Kosár tartalma</h1>
      <Table striped bordered hover>
        <thead>
          <th>Név</th>
          <th>Ár</th>
        </thead>
        <tbody>
          {kosar.map((id) => {
            const pizza = pizzak.find((p) => p.id == id);

            return (
              <tr>
                <td>{pizza?.nev}</td>
                <td>{pizza?.ar} Ft</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Összesen:</td>
            <td>
              {kosar
                .map((id) => pizzak.find((p) => p.id == id)?.ar)
                .reduce((a, b) => Number(a) + Number(b))}
              Ft
            </td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
};

export default Cart;
