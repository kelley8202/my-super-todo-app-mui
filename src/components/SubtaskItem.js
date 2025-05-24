import React from 'react';
import { Checkbox, ListItemText, Box, Typography } from '@mui/material';

function SubtaskItem({ subtask, onToggleSubtask, parentTodoId }) {
  return (
    <Box
      onClick={() => onToggleSubtask(parentTodoId, subtask.id)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        py: 0.2,
        px: 1,
        borderRadius: 1,
        '&:hover': {
            bgcolor: 'action.hover'
        }
      }}
    >
      <Checkbox
        checked={subtask.completed}
        size="small"
        edge="start"
        tabIndex={-1}
        disableRipple
        color="secondary"
        sx={{mr: 0.5, p:0.5}}
      />
      <Typography
        variant="body2"
        sx={{
          textDecoration: subtask.completed ? 'line-through' : 'none',
          color: subtask.completed ? 'text.disabled' : 'text.secondary',
          flexGrow: 1,
        }}
      >
        {subtask.text}
      </Typography>
    </Box>
  );
}

export default SubtaskItem;