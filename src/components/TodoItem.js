import React, { useState } from 'react';
import TodoForm from './TodoForm'; // For editing inline
import SubtaskItem from './SubtaskItem';
import {
  Card, CardContent, CardActions, Checkbox, IconButton, Typography, Box, Stack, Chip, Collapse, Divider, Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import NotesIcon from '@mui/icons-material/Notes';
import EventIcon from '@mui/icons-material/Event';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'; // For medium priority


function TodoItem({ todo, onToggleComplete, onDeleteTodo, onUpdateTodo, onToggleSubtask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleUpdate = (updatedTodo) => {
    onUpdateTodo(updatedTodo);
    setIsEditing(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getPriorityChipColor = (priority) => {
    if (priority === 'high') return 'error';
    if (priority === 'medium') return 'warning';
    if (priority === 'low') return 'success';
    return 'default';
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'high') return <PriorityHighIcon fontSize="inherit" />;
    if (priority === 'medium') return <FiberManualRecordIcon fontSize="inherit" sx={{fontSize: '0.9em'}} />; // Smaller dot
    if (priority === 'low') return <LowPriorityIcon fontSize="inherit" />;
    return null;
  }

  if (isEditing) {
    // Sử dụng TodoForm để sửa, truyền onCancelEdit
    return (
        <TodoForm
          existingTodo={todo}
          onUpdateTodo={handleUpdate}
          onCancelEdit={() => setIsEditing(false)}
        />
    );
  }

  return (
    <Card
      sx={{
        mb: 2,
        bgcolor: todo.completed ? (theme) => theme.palette.action.disabledBackground : 'background.paper',
        opacity: todo.completed ? 0.7 : 1,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardContent sx={{ pb: expanded || (todo.notes || (todo.subtasks && todo.subtasks.length > 0)) ? 1 : 2 }}>
        <Stack direction="row" alignItems="flex-start" spacing={1}>
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id)}
            color="primary"
            sx={{p:0, mr:1, mt: 0.5}}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="div"
              onClick={() => onToggleComplete(todo.id)}
              sx={{
                cursor: 'pointer',
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'text.disabled' : 'text.primary',
                wordBreak: 'break-word'
              }}
            >
              {todo.text}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{mt:0.5}}>
              {todo.priority && (
                <Chip
                  icon={getPriorityIcon(todo.priority)}
                  label={todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                  color={getPriorityChipColor(todo.priority)}
                  size="small"
                  variant="outlined"
                />
              )}
              {todo.dueDate && (
                <Chip
                  icon={<EventIcon fontSize="inherit"/>}
                  label={new Date(todo.dueDate).toLocaleDateString()}
                  size="small"
                  variant="outlined"
                />
              )}
            </Stack>
          </Box>
          <CardActions sx={{ p: 0, alignSelf: 'flex-start' }}>
            <IconButton size="small" onClick={() => setIsEditing(true)} aria-label="edit">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => onDeleteTodo(todo.id)} aria-label="delete" color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
            {(todo.notes || (todo.subtasks && todo.subtasks.length > 0)) && (
                 <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    size="small"
                >
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            )}
          </CardActions>
        </Stack>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider variant="middle" />
        <CardContent sx={{pt:1, pb: '16px !important' }}> {/* MUI CardContent adds paddingBottom by default */}
          {todo.notes && (
            <Paper variant="outlined" sx={{p:1.5, mb: todo.subtasks && todo.subtasks.length > 0 ? 1.5 : 0, bgcolor: (theme) => theme.palette.mode === 'light' ? 'grey[50]' : 'grey[800]'}}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{mb:0.5}}>
                    <NotesIcon fontSize="small" color="action"/>
                    <Typography variant="subtitle2" color="text.secondary">Ghi chú:</Typography>
                </Stack>
                <Typography variant="body2" sx={{whiteSpace: 'pre-wrap', pl:3.5}}>{todo.notes}</Typography>
            </Paper>
          )}
          {todo.subtasks && todo.subtasks.length > 0 && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{mb:0.5, pl: 0.5}}>Công việc con:</Typography>
              <Stack spacing={0.5}>
                {todo.subtasks.map(subtask => (
                  <SubtaskItem
                    key={subtask.id}
                    subtask={subtask}
                    parentTodoId={todo.id}
                    onToggleSubtask={onToggleSubtask}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default TodoItem;