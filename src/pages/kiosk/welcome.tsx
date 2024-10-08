import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useList } from "@refinedev/core";
import React, { useMemo } from "react";
import { useNavigate } from "react-router";
import { useWaitTime } from "../../components/wait-time-context";
import { IVisit } from "../../interfaces";
import { KioskWrapper } from "./wrapper";

export const KioskWelcome: React.FC = () => {
  const navigate = useNavigate();

  const { data: visitList } = useList<IVisit>({
    resource: "visit",
    liveMode: "auto",
  });

  const waiting = useMemo(() => {
    if (!visitList?.data) return 0;
    return visitList?.data.reduce((acc, visit) => {
      if (visit.status === "Waiting") {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [visitList?.data]);

  const { waitTime } = useWaitTime();

  return (
    <KioskWrapper>
      <Card>
        <CardContent>
          <Stack spacing={4} sx={{ textAlign: "center" }}>
            <Box>
              <Typography variant="h5">
                Welcome to {import.meta.env.VITE_LOCATION_NAME}
              </Typography>
              <Typography variant="body1">
                Address: {import.meta.env.VITE_LOCATION_ADDRESS}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5">People waiting: {waiting}</Typography>
              <Typography variant="h5">Estimated time: {waitTime}</Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("./details")}
                sx={{ width: "60%" }}
              >
                Join Line Now
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </KioskWrapper>
  );
};
