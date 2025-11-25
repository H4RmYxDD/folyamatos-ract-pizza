import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import type { Pizza } from "../types/Pizza";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

const CartPage = () => {
  const [kosar, setKosar] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("kosar") ?? "[]")
  );
  const [pizzak, setPizzak] = useState<Array<Pizza>>([]);
  useEffect(() => {
    apiClient
      .get("/pizzak")
      .then((response) => setPizzak(response.data))
      .catch(() => toast.error("A pizzák betöltése sikertelen volt"));
  }, []);
  const [fizetendo, setFizetendo] = useState<number>(0);

  return (
    <>
      <h1>Kosar tartalma</h1>
      <Table striped bordered hover>
        <thead>
          <th>Név</th>
          <th>Ár</th>
        </thead>
        <tbody>
          {kosar.map((id) => {
            const pizza = pizzak.find((p) => (p.id = id));
            if (pizza?.ar)
            setFizetendo(fizetendo + pizza?.ar);
            return (
              <tr>
                <td>{pizza?.nev}</td>
                <td>{pizza?.ar}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <td></td>
          <td>{fizetendo} Ft</td>
        </tfoot>
      </Table>
    </>
  );
};

export default CartPage;
