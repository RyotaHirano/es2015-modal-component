import gulp from 'gulp';
import requireDir from 'require-dir';
import runSequence from 'run-sequence';
import { reload } from 'browser-sync';
import { DIR } from './gulp/conf';

requireDir('./gulp/tasks');

gulp.task('predefault', cb => {
  runSequence(
    ['jade', 'sass', 'webpack'],
    'serve',
    cb
  );
});

gulp.task('build', cb => {
  runSequence(
    'clean',
    ['jade', 'sass'],
    'copy:cssDir',
    'copy:css',
    'copy:img',
    'copy:build',
    cb
  );
});

gulp.task('default', ['predefault'], () => {
  gulp.watch(
    [`${DIR.SRC}/html/**/*.jade`],
    ['jade', reload]
  );
  gulp.watch(
    [`${DIR.SRC}/css/**/*.{scss,sass}`],
    ['sass', reload]
  );
  gulp.watch(
    [`${DIR.SRC}/js/**/*.js`],
    ['webpack', reload]
  ).on('change', ev => {
    console.log(`File ${ev.path} was ${ev.type}, running tasks...`);
  });
});
