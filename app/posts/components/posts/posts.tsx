import classNames from 'classnames';
import { DateTime } from '@/components/date-time';
import { Comment } from '@/components/comment';
import { LinkCtr } from '@/components/link-ctr';
import { Body } from '@/components/body';
import type { Post } from '@/lib/types';
import styles from './posts.module.scss';

export function Posts({ posts }: { posts: Post[] }) {
    const last20Posts = posts.slice(0, 21);
    const dates = [
        ...new Set(last20Posts.map(({ date }) => date.split('T')[0])),
    ];

    return (
        <>
            <div className={styles['page-title']}>
                <Comment text="Posts" />
                <DateTime className={styles.date} dateString={dates[0]} />
            </div>
            <div className={styles['date-groups']}>
                {dates.map((date, dateIndex) => {
                    return (
                        <div
                            key={date}
                            className={styles['posts-ctr']}
                            data-date={date}
                        >
                            {dateIndex !== 0 && (
                                <DateTime
                                    className={styles.date}
                                    dateString={date}
                                />
                            )}
                            {/* <DateTime className={styles.date} dateString={date} /> */}
                            <div className={styles.posts}>
                                {last20Posts
                                    .filter(
                                        (post) =>
                                            post.date.split('T')[0] === date
                                    )
                                    .map(
                                        (
                                            { slug, title, date, body },
                                            postIndex
                                        ) => {
                                            return (
                                                <article
                                                    key={slug}
                                                    className={styles.post}
                                                >
                                                    <h2
                                                        className={classNames(
                                                            styles.title,
                                                            {
                                                                [styles.first]:
                                                                    dateIndex ===
                                                                        0 &&
                                                                    postIndex ===
                                                                        0,
                                                            }
                                                        )}
                                                    >
                                                        <LinkCtr
                                                            href={`/posts/${slug}`}
                                                        >
                                                            {title}
                                                        </LinkCtr>
                                                    </h2>

                                                    <Body>{body}</Body>
                                                </article>
                                            );
                                        }
                                    )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
