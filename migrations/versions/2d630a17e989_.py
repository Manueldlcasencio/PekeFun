"""empty message

Revision ID: 2d630a17e989
Revises: 3be76eaa7a0a
Create Date: 2023-03-17 19:16:33.231372

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2d630a17e989'
down_revision = '3be76eaa7a0a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('child', schema=None) as batch_op:
        batch_op.alter_column('parent',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.drop_constraint('child_parent_fkey', type_='foreignkey')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('child', schema=None) as batch_op:
        batch_op.create_foreign_key('child_parent_fkey', 'tutor', ['parent'], ['id'])
        batch_op.alter_column('parent',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###
