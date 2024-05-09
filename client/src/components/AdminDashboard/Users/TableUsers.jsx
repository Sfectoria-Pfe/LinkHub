import React, { useContext, useState } from "react";
import quizContext from "../../TeacherDashboard/context/quizContext";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";

const AddQuiz = (props) => {
  const context = useContext(quizContext);
  const { addQuiz, editCode } = context;

  const [select, setSelect] = useState("yes");
  const [quiz, setQuiz] = useState({
    id: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    title: "",
    mcq: select,
    code: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addQuiz(
      quiz.question,
      quiz.option1,
      quiz.option2,
      quiz.option3,
      quiz.option4,
      quiz.answer,
      quiz.title,
      select,
      code
    );
    setQuiz({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      title: "",
      mcq: select,
    });
    props.showAlert("Added Successfully", "success");
  };

  var code;
  const [gcode, setGcode] = useState("");

  const test = () => {
    const publish = () => {
      var len = 6;
      var arr = "1234567890qwertyuiopasdfghjklzxcvbnm";
      var ans = "";
      for (var i = len; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
      }
      code = ans;
      setGcode(code);
    };
    publish();
    const editTESTCode = () => {
      editCode(code);
      props.showAlert("Quiz Published Successfully", "success");
    };
    editTESTCode();
  };

  const onChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" mb={3}>
          Add your Quiz
        </Typography>
        <Button
          onClick={test}
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
        >
          Publish
        </Button>
        <TextField
          fullWidth
          label="Code"
          variant="outlined"
          name="code"
          value={gcode}
          onChange={onChange}
          sx={{ mb: 3 }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Question"
              variant="outlined"
              name="question"
              value={quiz.question}
              onChange={onChange}
              required
              minLength={5}
              placeholder="Write your Question here"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              name="title"
              value={quiz.title}
              onChange={onChange}
              required
              minLength={5}
              placeholder="Enter the title"
              sx={{ mb: 2 }}
            />
          </Grid>
          {[1, 2, 3, 4].map((optionNumber) => (
            <Grid item xs={6} key={optionNumber}>
              <TextField
                fullWidth
                label={`Option ${optionNumber}`}
                variant="outlined"
                name={`option${optionNumber}`}
                value={quiz[`option${optionNumber}`]}
                onChange={onChange}
                required
                minLength={5}
                placeholder={`Enter the option ${optionNumber}`}
                sx={{ mb: 2 }}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Answer of the above question"
              variant="outlined"
              name="answer"
              value={quiz.answer}
              onChange={onChange}
              required
              minLength={5}
              placeholder="Enter the answer"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Is this question MCQ:</InputLabel>
              <Select
                value={select}
                onChange={(e) => setSelect(e.target.value)}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          disabled={
            quiz.question.length < 5 ||
            quiz.option1.length < 3 ||
            quiz.option2.length < 3 ||
            quiz.option3.length < 3 ||
            quiz.option4.length < 3 ||
            quiz.answer.length < 3
          }
          variant="contained"
          color="primary"
          onClick={handleClick}
          sx={{ width: "100%", mt: 3 }}
        >
          Add Quiz
        </Button>
      </Paper>
    </Container>
  );
};

export default AddQuiz;
