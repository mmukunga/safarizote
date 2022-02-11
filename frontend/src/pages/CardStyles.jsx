import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: props => ({
          color: theme.color,
          margin: '10px auto',
          width: props.width
        })
      })
  );

  export default useStyles;