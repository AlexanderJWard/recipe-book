import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Support from "./Support";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";
import Loading from "../../components/Loading";

function SupportPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState({ results: [] });

  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: ticket }] = await Promise.all([
          axiosReq.get(`/support_tickets/${id}`),
        ]);
        setTicket({ results: [ticket] });
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Support {...ticket.results[0]} setTickets={setTicket} supportPage />
        <p>Test</p>
      </Col>
    </Row>
  );
}

export default SupportPage;
