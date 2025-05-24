import React from 'react';
import TodoItem from './TodoItem';
import { List, Typography, Box } from '@mui/material';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // If using dnd

function TodoList({
  todos,
  onToggleComplete,
  onDeleteTodo,
  onUpdateTodo,
  onToggleSubtask,
}) {
  if (!todos.length) {
    return (
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Không có công việc nào để hiển thị. Hãy thêm công việc mới!
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'transparent', p:0 }}> {/* Remove default list padding */}
      {todos.map((todo, index) => (
        // Nếu dùng react-beautiful-dnd, bọc Draggable ở đây
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo}
          onToggleSubtask={onToggleSubtask}
        />
      ))}
    </List>
  );
}

export default TodoList;