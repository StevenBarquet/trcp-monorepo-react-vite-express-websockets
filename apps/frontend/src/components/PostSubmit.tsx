import { useState } from 'react';
import styles from './components.module.css';
import { trpc } from 'src/config/trpc-config';

export function PostSubmit() {
  // -----------------------CONSTS, HOOKS, STATES
  const { handleInputChange, handleSubmit, inputValue } = useHandleForm();
  const { mutate } = trpc.post.createPost.useMutation();
  // -----------------------MAIN METHODS
  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    await mutate({
      title: inputValue,
      text: inputValue,
    })
    handleSubmit(e)
  }

  // -----------------------RENDER
  return (
    <form onSubmit={onSubmit} className={styles.PostSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Write your post"
      />
      <button type="submit">Submit Post</button>
    </form>
  );
}

function useHandleForm() {
  // -----------------------CONSTS, HOOKS, STATES
  const [inputValue, setInputValue] = useState('');

  // -----------------------MAIN METHODS
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputValue);
    setInputValue('');
  };
  // -----------------------HOOK DATA
  return {
    inputValue,
    handleInputChange,
    handleSubmit
  };
}
