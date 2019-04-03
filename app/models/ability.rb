class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    can :read, Educator
    can :create, :session
    if user.present?
      can :read, Student
      can :read, Course
      can :read, Deck
      can :read, Card
      can :read, CourseStudentRelationship
      can :read, EducatorStudentRelationship
      can :destroy, :session
      if user.educator?
        can :manage, Educator, id: user.id
        can :manage, Course, educator_id: user.id
        can :manage, Deck, course: { educator_id: user.id }
        can :manage, Card, deck: { course: { educator_id: user.id } }
      end
      if user.student?
        can :manage, Student, id: user.id
        can :manage, CourseStudentRelationship, student_id: user.id
        can :manage, EducatorStudentRelationship, student_id: user.id
      end
    end
    # For testing requests that expect json responses
    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
  end
end
