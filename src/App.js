import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
// import "./App.css";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import ProtectedRoutes from "./components/Router/ProtectedRoutes";
import { Dictionary } from "./pages/Dictionary/Dictionary";
import { Learn } from "./pages/Learn/LyricPlayer/Learn";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
// import { Register } from "./pages/Register/Register";

import { Scoreboard } from "./pages/Scoreboard/Scoreboard";
import { LyricPlayer } from "./pages/Learn/LyricPlayer/LyricPlayer";
import { SignUp } from "./pages/Login/SignUp";
import { Quiz } from "./pages/Quiz/Quiz";
import { Words } from "./pages/Words/Words";

import * as React from "react";
import { useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import LoginIcon from "@mui/icons-material/Login";

import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { uploadSongs } from "./utils/Firebase/Songs/songs.firebase";

const iconSize = 30;

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          "&:hover": {
            opacity: 0.6,
            background: "#eaeaea",
          },
        }),
      },
    },
  },
  palette: {
    primary: {
      main: "#0052cc",
    },
    secondary: {
      main: "#edf2ff",
    },
    default: {
      main: "#d2d2d2",
    },
  },
});
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// function MiniDrawer() {
//   const fabStyle = {
//     position: "absolute",
//     bottom: "1.5rem",
//     right: "1.5rem",
//   };
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   useEffect(() => {
//     uploadSongs();
//   }, []);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: "none" }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             My K Star
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "rtl" ? (
//               <ChevronRightIcon />
//             ) : (
//               <ChevronLeftIcon />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {["Home", "Learn", "Words", "Quiz"].map((text, index) => (
//             <ListItem key={text} disablePadding sx={{ display: "block" }}>
//               <ListItemButton
//                 component={Link}
//                 to={`/${text}`}
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? "initial" : "center",
//                   px: 2.5,
//                   paddingRight: 0,
//                   marginBottom: "0.25rem",
//                   marginTop: "0.25rem",
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : "auto",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {index === 0 &&
//                     (useLocation().pathname === "/Home" ? (
//                       <HomeIcon sx={{ fontSize: iconSize }} color="primary" />
//                     ) : (
//                       <HomeIcon sx={{ fontSize: iconSize }} />
//                     ))}
//                   {index === 1 &&
//                     (useLocation().pathname === "/Learn" ? (
//                       <PlayCircleOutlineIcon
//                         sx={{ fontSize: iconSize }}
//                         color="primary"
//                       />
//                     ) : (
//                       <PlayCircleOutlineIcon sx={{ fontSize: iconSize }} />
//                     ))}
//                   {index === 2 &&
//                     (useLocation().pathname === "/Words" ? (
//                       <LibraryBooksIcon
//                         sx={{ fontSize: iconSize }}
//                         color="primary"
//                       />
//                     ) : (
//                       <LibraryBooksIcon sx={{ fontSize: iconSize }} />
//                     ))}
//                   {index === 3 &&
//                     (useLocation().pathname === "/Quiz" ? (
//                       <QuizIcon sx={{ fontSize: iconSize }} color="primary" />
//                     ) : (
//                       <QuizIcon sx={{ fontSize: iconSize }} />
//                     ))}
//                   {/* {index === 1 && <PlayCircleOutlineIcon />}
//                   {index === 2 && <CreateIcon />}
//                   {index === 3 && <QuizIcon />} */}
//                   {console.log(useLocation().pathname)}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={text}
//                   sx={{
//                     opacity: open ? 1 : 0,
//                     marginTop: 0,
//                     marginBottom: 0,
//                   }}
//                 />
//                 {useLocation().pathname === "/" + text && (
//                   <div
//                     style={{
//                       backgroundColor: theme.palette.primary.main,
//                       borderTopLeftRadius: "1rem",
//                       borderBottomLeftRadius: "1rem",
//                       width: "0.5rem",
//                       height: "2rem",
//                     }}
//                   ></div>
//                 )}
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//       </Drawer>
//       <Fab color="primary" aria-label="add" style={fabStyle}>
//         <SearchIcon />
//       </Fab>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />
//         {/* <Typography paragraph>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
//           dolor purus non enim praesent elementum facilisis leo vel. Risus at
//           ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
//           quisque non tellus. Convallis convallis tellus id interdum velit
//           laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
//           adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
//           integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
//           eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
//           quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
//           vivamus at augue. At augue eget arcu dictum varius duis at consectetur
//           lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
//           faucibus et molestie ac.
//         </Typography>
//         <Typography paragraph>
//           Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
//           ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
//           elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
//           sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
//           mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
//           risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
//           purus viverra accumsan in. In hendrerit gravida rutrum quisque non
//           tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
//           morbi tristique senectus et. Adipiscing elit duis tristique
//           sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
//           eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
//           posuere sollicitudin aliquam ultrices sagittis orci a.
//         </Typography> */}
//       </Box>
//     </Box>
//   );
// }

function PermanentDrawerLeft() {
  let pages = ["lyric-player", "SignUp"];
  useEffect(() => {
    uploadSongs();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        "&.MuiBox-root": { width: 0, height: 0, zIndex: -1 },
      }}
    >
      <CssBaseline />
      <AppBar
      // position="fixed"
      // sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
            My K Star
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />

        <div style={{ textAlign: "center" }}>My K Star</div>
        <Divider />
        <List>
          {["Home", "Learn", "Words", "Quiz", "Login"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={`/${text}`}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  paddingRight: 0,
                  marginBottom: "0.25rem",
                  marginTop: "0.25rem",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 &&
                    (useLocation().pathname === "/Home" ? (
                      <HomeIcon sx={{ fontSize: iconSize }} color="primary" />
                    ) : (
                      <HomeIcon sx={{ fontSize: iconSize }} />
                    ))}
                  {index === 1 &&
                    (useLocation().pathname === "/Learn" ||
                    useLocation().pathname === "/lyric-player" ? (
                      <PlayCircleOutlineIcon
                        sx={{ fontSize: iconSize }}
                        color="primary"
                      />
                    ) : (
                      <PlayCircleOutlineIcon sx={{ fontSize: iconSize }} />
                    ))}
                  {index === 2 &&
                    (useLocation().pathname === "/Words" ? (
                      <LibraryBooksIcon
                        sx={{ fontSize: iconSize }}
                        color="primary"
                      />
                    ) : (
                      <LibraryBooksIcon sx={{ fontSize: iconSize }} />
                    ))}
                  {index === 3 &&
                    (useLocation().pathname === "/Quiz" ? (
                      <QuizIcon sx={{ fontSize: iconSize }} color="primary" />
                    ) : (
                      <QuizIcon sx={{ fontSize: iconSize }} />
                    ))}
                  {index === 4 &&
                    (useLocation().pathname === "/SignUp" ||
                    useLocation().pathname === "/Login" ? (
                      <LoginIcon sx={{ fontSize: iconSize }} color="primary" />
                    ) : (
                      <LoginIcon sx={{ fontSize: iconSize }} />
                    ))}
                  {/* {index === 1 && <PlayCircleOutlineIcon />}
                  {index === 2 && <CreateIcon />}
                  {index === 3 && <QuizIcon />} */}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    opacity: open ? 1 : 0,
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                />
                {useLocation().pathname === "/" + text ? (
                  <div
                    style={{
                      backgroundColor: theme.palette.primary.main,
                      borderTopLeftRadius: "1rem",
                      borderBottomLeftRadius: "1rem",
                      width: "0.5rem",
                      height: "2rem",
                    }}
                  ></div>
                ) : // pages.includes(searchElement)

                useLocation().pathname === "/lyric-player" ? (
                  index === 1 && (
                    <div
                      style={{
                        backgroundColor: theme.palette.primary.main,
                        borderTopLeftRadius: "1rem",
                        borderBottomLeftRadius: "1rem",
                        width: "0.5rem",
                        height: "2rem",
                      }}
                    ></div>
                  )
                ) : (
                  useLocation().pathname === "/SignUp" &&
                  index === 4 && (
                    <div
                      style={{
                        backgroundColor: theme.palette.primary.main,
                        borderTopLeftRadius: "1rem",
                        borderBottomLeftRadius: "1rem",
                        width: "0.5rem",
                        height: "2rem",
                      }}
                    ></div>
                  )
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Toolbar />
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 0 }}
      >
        
      </Box> */}
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{ marginLeft: "11rem", marginTop: "0rem", marginRight: "0rem" }}
      >
        <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
          <PermanentDrawerLeft />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/Home" element={<Home />}></Route>
              <Route path="/learn" element={<Learn />}></Route>
              <Route path="/dictionary" element={<Dictionary />}></Route>
              <Route path="/Words" element={<Words />}></Route>
              <Route path="/Quiz" element={<Quiz />}></Route>
              <Route path="/scoreboard" element={<Scoreboard />}></Route>
              <Route path="/lyric-player" element={<LyricPlayer />}></Route>
              {/* <Route path="/SignUp" element={<SignUp />}></Route> */}
            </Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/Login" element={<Login />}></Route>
          </Routes>
          {/* <MiniDrawer /> */}
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
