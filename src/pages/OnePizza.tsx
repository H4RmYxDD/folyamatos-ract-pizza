import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Pizza } from "../types/Pizza";
import { toast } from "react-toastify";
import apiClient, { baseURL } from "../api/apiClient";

const OnePizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pizza, setPizza] = useState<Pizza>();

  useEffect(() => {
    apiClient
      .get(`/pizzak/${id}`)
      .then((response) => setPizza(response.data))
      .catch(() => toast.error("A pizzák betöltése sikertelen volt"));
  }, [id]);

  const deletePizza = () => {
    apiClient
      .delete(`/pizzak/${id}`)
      .then(() => {
        toast.success("Sikeres törlés!");
        navigate("/"); // kezdőlapra irányítás
      })
      .catch(() => toast.error("Sikertelen törlés!"));
  };

  const editPizza = () => {
    navigate(`/edit-pizza/${id}`);
  };

  return (
    <>
      {pizza ? (
        <>
          <h1>{pizza.nev}</h1>
          <h2>{pizza.leiras}</h2>
          <img width={200} src={`${baseURL}/kepek/${pizza.imageUrl}`} />
          <br />
          <button onClick={editPizza}>Szerkesztés</button>
          <button onClick={deletePizza}>Törlés</button>
        </>
      ) : (
        <>A pizza nem található!</>
      )}
    </>
  );
};

export default OnePizza;
