import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Stack, IconButton, Divider, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';


function TodoForm({ addTodo, existingTodo, onUpdateTodo, onCancelEdit }) {
  const isEditing = !!existingTodo;
  const initialFormState = {
    text: '',
    dueDate: null, // MUI DatePicker dùng null cho ngày trống
    priority: 'medium',
    notes: '',
    subtasks: [],
  };

  const [todo, setTodo] = useState(
    isEditing ? { ...existingTodo, dueDate: existingTodo.dueDate ? new Date(existingTodo.dueDate) : null } : initialFormState
  );
  const [newSubtaskText, setNewSubtaskText] = useState('');

  useEffect(() => {
    if (isEditing) {
      setTodo({ ...existingTodo, dueDate: existingTodo.dueDate ? new Date(existingTodo.dueDate) : null });
    } else {
      setTodo(initialFormState);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingTodo, isEditing]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleDateChange = (newDate) => {
    setTodo({ ...todo, dueDate: newDate });
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (newSubtaskText.trim() === '') return;
    const newSubtask = { id: uuidv4(), text: newSubtaskText, completed: false };
    setTodo(prevTodo => ({
      ...prevTodo,
      subtasks: [...(prevTodo.subtasks || []), newSubtask]
    }));
    setNewSubtaskText('');
  };

  const handleRemoveSubtask = (subtaskId) => {
    setTodo(prevTodo => ({
        ...prevTodo,
        subtasks: prevTodo.subtasks.filter(st => st.id !== subtaskId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.text.trim() === '') return;

    const todoToSubmit = {
        ...todo,
        dueDate: todo.dueDate ? todo.dueDate.toISOString().split('T')[0] : null // Chuyển về YYYY-MM-DD string để lưu
    };

    if (isEditing) {
      onUpdateTodo(todoToSubmit);
    } else {
      addTodo(todoToSubmit);
      setTodo(initialFormState); // Reset form
    }
  };

  return (
    <Paper elevation={isEditing ? 4 : 1} sx={{ p: isEditing ? 3 : 2, mb: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        {isEditing ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Tên công việc"
            name="text"
            value={todo.text}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            size="small"
          />
          <TextField
            label="Ghi chú (tùy chọn)"
            name="notes"
            value={todo.notes}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            size="small"
          />
          <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
            <DatePicker
              label="Ngày hết hạn"
              value={todo.dueDate}
              onChange={handleDateChange}
              slotProps={{ textField: { fullWidth: true, size: 'small', variant: 'outlined' } }}
            />
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="priority-label">Ưu tiên</InputLabel>
              <Select
                labelId="priority-label"
                id="priority"
                name="priority"
                value={todo.priority}
                label="Ưu tiên"
                onChange={handleChange}
              >
                <MenuItem value="low">Thấp</MenuItem>
                <MenuItem value="medium">Trung bình</MenuItem>
                <MenuItem value="high">Cao</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Divider sx={{my:1}} />
          <Typography variant="subtitle1">Công việc con:</Typography>
          {todo.subtasks && todo.subtasks.map((st) => (
             <Stack key={st.id} direction="row" alignItems="center" spacing={1}>
                <SubdirectoryArrowRightIcon color="action" fontSize="small"/>
                <Typography variant="body2" sx={{flexGrow: 1}}>{st.text}</Typography>
                <Button size="small" color="error" variant="text" onClick={() => handleRemoveSubtask(st.id)}>Xóa</Button>
             </Stack>
          ))}
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="Thêm công việc con"
              value={newSubtaskText}
              onChange={(e) => setNewSubtaskText(e.target.value)}
              fullWidth
              size="small"
              variant="outlined"
            />
            <Button
              variant="outlined"
              size="small"
              onClick={handleAddSubtask}
              startIcon={<AddCircleOutlineIcon />}
              disabled={!newSubtaskText.trim()}
            >
              Thêm
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{mt: 2}}>
            {isEditing && (
              <Button variant="outlined" color="warning" onClick={onCancelEdit} startIcon={<CancelIcon />}>
                Hủy
              </Button>
            )}
            <Button type="submit" variant="contained" color="primary" startIcon={isEditing ? <SaveIcon /> : <AddCircleOutlineIcon />}>
              {isEditing ? 'Lưu thay đổi' : 'Thêm công việc'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}

export default TodoForm;