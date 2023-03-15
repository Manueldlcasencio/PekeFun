"""empty message

Revision ID: 88fddd5def71
Revises: 072b361575a2
Create Date: 2023-03-15 17:12:19.724090

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '88fddd5def71'
down_revision = '072b361575a2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('advertiser',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('lastname', sa.String(length=100), nullable=False),
    sa.Column('contact', sa.Integer(), nullable=False),
    sa.Column('company', sa.String(length=150), nullable=False),
    sa.Column('working_since', sa.DateTime(), nullable=True),
    sa.Column('description', sa.String(length=300), nullable=True),
    sa.Column('twitter', sa.String(length=150), nullable=True),
    sa.Column('avatar', sa.String(length=100), nullable=True),
    sa.Column('company_image', sa.String(length=100), nullable=True),
    sa.Column('others', sa.String(length=300), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('company'),
    sa.UniqueConstraint('contact'),
    sa.UniqueConstraint('twitter')
    )
    op.create_table('event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_advertiser', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('localization', sa.String(length=200), nullable=False),
    sa.Column('min_age', sa.Integer(), nullable=False),
    sa.Column('max_age', sa.Integer(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('length', sa.Integer(), nullable=True),
    sa.Column('category', sa.String(length=200), nullable=False),
    sa.Column('score', sa.Integer(), nullable=True),
    sa.Column('score_amount', sa.Integer(), nullable=True),
    sa.Column('score_sum', sa.Integer(), nullable=True),
    sa.Column('slots', sa.Integer(), nullable=True),
    sa.Column('description', sa.String(length=300), nullable=False),
    sa.Column('done', sa.Boolean(), nullable=False),
    sa.Column('contact', sa.Integer(), nullable=True),
    sa.Column('company', sa.String(length=150), nullable=True),
    sa.Column('cloth', sa.String(length=300), nullable=True),
    sa.Column('others', sa.String(length=300), nullable=True),
    sa.ForeignKeyConstraint(['company'], ['advertiser.company'], ),
    sa.ForeignKeyConstraint(['contact'], ['advertiser.contact'], ),
    sa.ForeignKeyConstraint(['id_advertiser'], ['advertiser.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('participants',
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('child_id', sa.Integer(), nullable=False),
    sa.Column('was_there', sa.Boolean(), nullable=True),
    sa.Column('score_given', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['child_id'], ['child.id'], ),
    sa.ForeignKeyConstraint(['event_id'], ['event.id'], ),
    sa.PrimaryKeyConstraint('event_id', 'child_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('participants')
    op.drop_table('event')
    op.drop_table('advertiser')
    # ### end Alembic commands ###
