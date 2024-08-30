import Layout from "../../components/Admin/Layout";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

export default function Dashboar() {
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Utilisateurs inscrits
              </Typography>
              <Typography variant="h2" component="div">
                1,234
              </Typography>
              <Typography variant="body1" component="div">
                +45 depuis la semaine dernière
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Activité récente
              </Typography>
              <Typography variant="body1" component="div">
                <ul>
                  <li>Nouvelle inscription: John Doe</li>
                  <li>Nouvelle inscription: Jane Smith</li>
                  <li>Commentaire ajouté sur le blog</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Revenus du mois
              </Typography>
              <Typography variant="h2" component="div">
                $12,345
              </Typography>
              <Typography variant="body1" component="div">
                +5% par rapport au mois précédent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Nouveaux messages
              </Typography>
              <Typography variant="h2" component="div">
                56
              </Typography>
              <Typography variant="body1" component="div">
                +12 depuis la semaine dernière
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Tâches complétées
              </Typography>
              <Typography variant="h2" component="div">
                98
              </Typography>
              <Typography variant="body1" component="div">
                +8 depuis la semaine dernière
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Statistiques des utilisateurs
              </Typography>
              <Box sx={{ height: 300 }}>
                <Typography variant="body1" align="center">
                  [Graphique des utilisateurs]
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
