import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterControls from './components/FilterControls';

import { ThemeProvider, createTheme, CssBaseline, Container, Typography, IconButton, Box, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { getAppTheme } from './theme'; // Import theme đã tạo

const LOCAL_STORAGE_KEY_TODOS = 'superTodosApp.mui.todos';
const LOCAL_STORAGE_KEY_THEME = 'superTodosApp.mui.themeMode';

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY_TODOS);
    try {
      if (storedTodos) return JSON.parse(storedTodos);
    } catch (error) {
      console.error("Error parsing todos from localStorage", error);
    }
    return [];
  });

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt_desc');
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY_THEME) || 'light';
  });

  const appTheme = useMemo(() => createTheme(getAppTheme(themeMode)), [themeMode]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TODOS, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_THEME, themeMode);
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const addTodo = useCallback((todoData) => {
    const newTodo = {
      id: uuidv4(),
      completed: false,
      subtasks: todoData.subtasks || [],
      ...todoData,
      createdAt: Date.now(),
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  }, []);

  const toggleComplete = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    if (window.confirm("Bạn có chắc muốn xóa công việc này?")) {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }
  }, []);

  const updateTodo = useCallback((updatedTodo) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
      )
    );
  }, []);

  const toggleSubtask = useCallback((todoId, subtaskId) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subtasks: todo.subtasks.map(sub =>
              sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
            ),
          };
        }
        return todo;
      })
    );
  }, []);

  const clearCompleted = useCallback(() => {
    if (window.confirm("Bạn có chắc muốn xóa tất cả các công việc đã hoàn thành?")) {
      setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    }
  }, []);

  const processedTodos = useMemo(() => {
    let filtered = todos;
    if (filter === 'active') filtered = todos.filter(todo => !todo.completed);
    else if (filter === 'completed') filtered = todos.filter(todo => todo.completed);

    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (todo.notes && todo.notes.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    const [sortField, sortOrder] = sortBy.split('_');
    const priorityValues = { low: 1, medium: 2, high: 3 };
    filtered.sort((a, b) => {
      let valA, valB;
      if (sortField === 'priority') {
        valA = priorityValues[a.priority] || 0;
        valB = priorityValues[b.priority] || 0;
      } else if (sortField === 'dueDate') {
        valA = a.dueDate ? new Date(a.dueDate).getTime() : (sortOrder === 'asc' ? Infinity : -Infinity);
        valB = b.dueDate ? new Date(b.dueDate).getTime() : (sortOrder === 'asc' ? Infinity : -Infinity);
      } else if (sortField === 'createdAt') {
        valA = a.createdAt;
        valB = b.createdAt;
      } else {
        valA = a.text.toLowerCase();
        valB = b.text.toLowerCase();
      }
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [todos, filter, searchTerm, sortBy]);

  const activeTodoCount = useMemo(() => todos.filter(todo => !todo.completed).length, [todos]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline /> {/* Chuẩn hóa CSS */}
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
                Công việc Siêu Cấp (MUI)
              </Typography>
              <IconButton onClick={toggleThemeMode} color="inherit">
                {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
            </Box>

            <TodoForm addTodo={addTodo} />

            <FilterControls
              currentFilter={filter}
              onFilterChange={setFilter}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClearCompleted={clearCompleted}
              activeTodoCount={activeTodoCount}
              todoCount={todos.length}
            />

            <TodoList
              todos={processedTodos}
              onToggleComplete={toggleComplete}
              onDeleteTodo={deleteTodo}
              onUpdateTodo={updateTodo}
              onToggleSubtask={toggleSubtask}
            />
            <Box sx={{mt: 3, textAlign: 'center'}}>
                <Typography variant="caption">
                    Tổng: {todos.length} | Đang làm: {activeTodoCount} | Hoàn thành: {todos.length - activeTodoCount}
                </Typography>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;