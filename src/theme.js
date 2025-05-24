import { createTheme } from '@mui/material/styles';
import { red, blueGrey, grey, cyan, teal } from '@mui/material/colors';

// Chọn font chữ đẹp từ Google Fonts (ví dụ: Inter hoặc Open Sans)
// Đảm bảo bạn đã import font này trong public/index.html
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet">

export const getAppTheme = (mode) => {
  const isLight = mode === 'light';

  return createTheme({ // Gọi createTheme ở đây, không cần import nó trong App.js nữa
    palette: {
      mode,
      primary: {
        main: isLight ? teal[700] : teal[300], // Màu Teal hiện đại
        contrastText: isLight ? '#fff' : grey[900],
      },
      secondary: {
        main: isLight ? cyan[600] : cyan[200],
        contrastText: isLight ? '#fff' : grey[900],
      },
      background: {
        default: isLight ? blueGrey[50] : '#1a1d20', // Nền hơi xám/tối
        paper: isLight ? '#ffffff' : grey[900],     // Nền của Card, Paper
      },
      text: {
        primary: isLight ? grey[900] : grey[100],
        secondary: isLight ? grey[700] : grey[400],
      },
      error: {
        main: red.A400,
      },
      // Màu cho priority (ví dụ)
      priorityHigh: {
        main: isLight ? red[500] : red[300],
        contrastText: '#fff',
      },
      priorityMedium: {
        main: isLight ? '#ed6c02' : '#ffa726', // Orange
        contrastText: '#fff',
      },
      priorityLow: {
        main: isLight ? '#2e7d32' : '#66bb6a', // Green
        contrastText: '#fff',
      },
      // Thêm các màu tùy chỉnh khác nếu cần
      cardBorder: isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 700,
        fontSize: '2rem', // Điều chỉnh kích thước
        letterSpacing: '0.02em',
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.2rem',
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem', // 16px
      },
      body2: {
        fontSize: '0.875rem', // 14px
      },
      button: {
        textTransform: 'none', // Giữ nguyên chữ thường
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12, // Bo góc đồng nhất cho các component
    },
    components: {
      // Tùy chỉnh style mặc định cho các component
      MuiButton: {
        defaultProps: {
          disableElevation: true, // Loại bỏ đổ bóng mặc định cho button
        },
        styleOverrides: {
          root: {
            padding: '8px 20px', // Tăng padding cho button
          },
          containedPrimary: {
            '&:hover': {
              backgroundColor: teal[800],
            },
          },
        },
      },
      MuiPaper: { // Áp dụng cho Paper và Card
        styleOverrides: {
          root: {
            // backgroundImage: 'none', // Tắt gradient nếu MUI mặc định có
          },
          elevation1: { // Ít đổ bóng hơn cho các Paper/Card cơ bản
            boxShadow: isLight ? '0px 4px 12px rgba(0,0,0,0.05)' : '0px 4px 12px rgba(0,0,0,0.2)',
          },
          elevation3: { // Đổ bóng rõ hơn cho Paper chính
             boxShadow: isLight ? '0px 5px 15px rgba(0,0,0,0.08)' : '0px 5px 15px rgba(0,0,0,0.3)',
          }
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            // border: `1px solid ${isLight ? grey[200] : grey[800]}`, // Thêm viền nhẹ cho card
            // boxShadow: 'none', // Hoặc tắt hẳn shadow nếu muốn flat design
          }
        }
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined', // Mặc định là outlined
          size: 'small',
        },
      },
      MuiSelect: {
        defaultProps: {
            variant: 'outlined',
            size: 'small',
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: isLight ? grey[200] : grey[700],
            }
          }
        }
      },
      // Thêm tùy chỉnh cho các component khác như AppBar, Drawer nếu có
    },
    // Thêm các thuộc tính theme khác như spacing, breakpoints, zIndex... nếu cần
    // spacing: 8, // Mặc định là 8px, theme.spacing(1) = 8px
  });
};