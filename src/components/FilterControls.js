import React from 'react';
import {
  Box, ButtonGroup, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Paper, Typography, Stack, Badge
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

function FilterControls({
  currentFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  onClearCompleted,
  activeTodoCount,
  todoCount
}) {
  const completedCount = todoCount - activeTodoCount;

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            label="Tìm kiếm công việc"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{mr:1}}/>,
            }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack direction="row" spacing={1} alignItems="center">
             <FilterListIcon color="action"/>
             <Typography variant="caption" color="text.secondary" sx={{mr:0.5, display: {xs: 'none', sm: 'inline'}}}>Lọc:</Typography>
            <ButtonGroup variant="outlined" size="small" aria-label="filter-buttons">
              <Button
                onClick={() => onFilterChange('all')}
                variant={currentFilter === 'all' ? 'contained' : 'outlined'}
              >
                Tất cả ({todoCount})
              </Button>
              <Button
                onClick={() => onFilterChange('active')}
                variant={currentFilter === 'active' ? 'contained' : 'outlined'}
              >
                 <Badge badgeContent={activeTodoCount} color="primary" sx={{mr: activeTodoCount > 0 ? 1.5 : 0}}>
                    Đang làm
                 </Badge>
              </Button>
              <Button
                onClick={() => onFilterChange('completed')}
                variant={currentFilter === 'completed' ? 'contained' : 'outlined'}
              >
                Hoàn thành ({completedCount})
              </Button>
            </ButtonGroup>
          </Stack>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="sort-by-label">Sắp xếp</InputLabel>
            <Select
              labelId="sort-by-label"
              value={sortBy}
              label="Sắp xếp"
              onChange={(e) => onSortChange(e.target.value)}
              startAdornment={<SortIcon color="action" sx={{mr:1}}/>}
            >
              <MenuItem value="createdAt_desc">Ngày tạo (Mới nhất)</MenuItem>
              <MenuItem value="createdAt_asc">Ngày tạo (Cũ nhất)</MenuItem>
              <MenuItem value="dueDate_asc">Hạn chót (Gần nhất)</MenuItem>
              <MenuItem value="dueDate_desc">Hạn chót (Xa nhất)</MenuItem>
              <MenuItem value="priority_desc">Ưu tiên (Cao &rarr; Thấp)</MenuItem>
              <MenuItem value="priority_asc">Ưu tiên (Thấp &rarr; Cao)</MenuItem>
              <MenuItem value="text_asc">Tên (A-Z)</MenuItem>
              <MenuItem value="text_desc">Tên (Z-A)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {completedCount > 0 && (
            <Grid item xs={12} sx={{textAlign: 'right'}}>
                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={onClearCompleted}
                    startIcon={<DeleteSweepIcon />}
                >
                    Xóa ({completedCount}) việc đã hoàn thành
                </Button>
            </Grid>
        )}
      </Grid>
    </Paper>
  );
}

export default FilterControls;