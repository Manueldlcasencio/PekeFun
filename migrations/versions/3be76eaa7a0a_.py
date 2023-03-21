"""empty message

Revision ID: 3be76eaa7a0a
Revises: 88fddd5def71
Create Date: 2023-03-17 18:58:20.715391

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3be76eaa7a0a'
down_revision = '88fddd5def71'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('child', schema=None) as batch_op:
        batch_op.add_column(sa.Column('parent', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'tutor', ['parent'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('child', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('parent')

    # ### end Alembic commands ###
